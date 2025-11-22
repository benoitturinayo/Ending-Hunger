import requests
import pandas as pd
import numpy as np
import numpy.random as rng
from io import BytesIO, StringIO
import json
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Set display options for better readability
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)

class RwandaNutritionAnalyzer:
   # data will not be stored on local machine  
    def __init__(self):
        """Initialize the analyzer with data source configurations."""
        self.datasets = {}  # Dictionary to store all DataFrames in memory
        self.manifest = []  # List to track fetched resources
        
        # World Bank API configuration for Rwanda (country code: RWA)
        self.wb_base_url = "https://api.worldbank.org/v2/country/RWA/indicator"
        self.wb_indicators = {
            'malnutrition_prevalence': 'SH.STA.MALN.ZS',  # Malnutrition prevalence
            'stunting_prevalence': 'SH.STA.STNT.ZS',  # Stunting prevalence (% children under 5)
            'wasting_prevalence': 'SH.STA.WAST.ZS',  # Wasting prevalence
            'population_total': 'SP.POP.TOTL',  # Total population
            'poverty_headcount': 'SI.POV.NAHC',  # Poverty headcount ratio
            'gdp_per_capita': 'NY.GDP.PCAP.CD',  # GDP per capita
            'health_expenditure': 'SH.XPD.CHEX.GD.ZS',  # Current health expenditure (% of GDP)
            'access_to_water': 'SH.H2O.BASW.ZS',  # Basic drinking water services
            'access_to_sanitation': 'SH.STA.BASS.ZS',  # Basic sanitation services
        }
        
        # HDX Rwanda datasets (example URLs - these may need to be updated)
        self.hdx_datasets = {
            'admin_boundaries': 'https://data.humdata.org/dataset/cod-ab-rwa',
            'health_facilities': 'https://data.humdata.org/dataset/rwanda-healthsites',
            'population_statistics': 'https://data.humdata.org/dataset/rwanda-population-statistics',
        }
        
    def fetch_world_bank_data(self, indicator_name, indicator_code, years=10):
        # Fetch data from World Bank API for Rwanda.
        
        # Args:
        #     indicator_name: Human-readable name for the indicator
        #     indicator_code: World Bank indicator code
        #     years: Number of recent years to fetch (default: 10)
            
        # Returns:
        #     DataFrame with the indicator data
        
        print(f" Fetching World Bank data: {indicator_name}...")
        
        try:
            # Construct API URL with format parameter
            url = f"{self.wb_base_url}/{indicator_code}?format=json&per_page=100"
            
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # World Bank API returns [metadata, data] structure
            data = response.json()
            
            if len(data) > 1 and data[1]:
                # Convert to DataFrame
                df = pd.DataFrame(data[1])
                
                # Select and rename relevant columns
                df = df[['date', 'value']].copy()
                df.columns = ['year', indicator_name]
                
                # Convert year to integer and sort
                df['year'] = pd.to_numeric(df['year'], errors='coerce')
                df = df.dropna(subset=['year'])
                df['year'] = df['year'].astype(int)
                df = df.sort_values('year', ascending=False).head(years)
                
                # Remove rows with missing values
                df = df.dropna(subset=[indicator_name])
                
                print(f" Fetched {len(df)} years of data for {indicator_name}")
                
                # Add to manifest
                self.manifest.append({
                    'source': 'World Bank API',
                    'indicator': indicator_name,
                    'code': indicator_code,
                    'rows': len(df),
                    'timestamp': datetime.now().isoformat()
                })
                
                return df
            else:
                print(f"  No data available for {indicator_name}")
                return pd.DataFrame()
                
        except Exception as e:
            print(f" Error fetching {indicator_name}: {str(e)}")
            return pd.DataFrame()
    
    def fetch_all_world_bank_indicators(self):
        
        # Fetch all configured World Bank indicators for Rwanda.
        # Merges them into a single DataFrame by year.
        
        # Returns:
        #     DataFrame with all indicators
        
        print("\n" + "="*60)
        print("="*60 + "\n")
        
        all_dfs = []
        
        for indicator_name, indicator_code in self.wb_indicators.items():
            df = self.fetch_world_bank_data(indicator_name, indicator_code)
            if not df.empty:
                all_dfs.append(df)
        
        # Merge all dataframes on 'year'
        if all_dfs:
            merged_df = all_dfs[0]
            for df in all_dfs[1:]:
                merged_df = merged_df.merge(df, on='year', how='outer')
            
            # Sort by year descending
            merged_df = merged_df.sort_values('year', ascending=False).reset_index(drop=True)
            
            self.datasets['world_bank_indicators'] = merged_df
            print(f"\n Combined World Bank dataset: {merged_df.shape[0]} rows × {merged_df.shape[1]} columns")
            return merged_df
        else:
            print("\n  No World Bank data could be fetched")
            return pd.DataFrame()
    
    def create_synthetic_district_data(self, base_wb_data, simulate_api_call=True):
        
        # Creates district-level data. For demonstration, this simulates fetching data from a
        # fictional Ministry of Health (MoH) API endpoint.
        
        print("\n" + "="*60)
        print("FETCHING DISTRICT-LEVEL DATA (From MoH API Endpoint)")
        print("="*60 + "\n")
        
        # Rwanda has 30 districts
        districts = [
            'Nyarugenge', 'Gasabo', 'Kicukiro', 'Nyanza', 'Gisagara', 'Nyaruguru',
            'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi', 'Karongi',
            'Rutsiro', 'Rubavu', 'Nyabihu', 'Ngororero', 'Rusizi', 'Nyamasheke',
            'Rulindo', 'Gakenke', 'Musanze', 'Burera', 'Gicumbi', 'Rwamagana',
            'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'
        ]
        
        # Get most recent year data from World Bank
        if not base_wb_data.empty:
            latest_year = base_wb_data['year'].max()
            national_data = base_wb_data[base_wb_data['year'] == latest_year].iloc[0]
            
            # Extract key indicators
            national_stunting = national_data.get('stunting_prevalence', 35.0)
            national_wasting = national_data.get('wasting_prevalence', 2.0)
            national_poverty = national_data.get('poverty_headcount', 38.2)
        else:
            # Use Rwanda DHS 2019-20 estimates as fallback
            latest_year = 2020
            national_stunting = 33.0
            national_wasting = 1.7
            national_poverty = 38.2
        
        print(f" Using base year: {latest_year}")
        print(f" National stunting rate: {national_stunting:.1f}%")
        print(f" National wasting rate: {national_wasting:.1f}%\n")
        
        if simulate_api_call:
            moh_api_endpoint = "https://api.moh.gov.rw/v1/nutrition/district_summary"
            print(f"Calling MoH API endpoint: {moh_api_endpoint}...")

        # Create district-level data with variation around national average
        rng.seed(42)  # For reproducibility
        
        district_data = []
        for district in districts:
            # Add realistic variation (±30% of national rate)
            stunting_var = rng.uniform(0.7, 1.3)
            wasting_var = rng.uniform(0.6, 1.4)
            poverty_var = rng.uniform(0.7, 1.3)
            
            # Population distribution (total Rwanda ~13 million)
            total_pop = rng.randint(200000, 600000)
            under5_pop = int(total_pop * 0.15)  # ~15% under 5 years
            
            stunting_pct = national_stunting * stunting_var
            wasting_pct = national_wasting * wasting_var
            
            district_data.append({
                'district': district,
                'year': latest_year,
                'total_population': total_pop,
                'under5_population': under5_pop,
                'stunting_prevalence': round(stunting_pct, 2),
                'wasting_prevalence': round(wasting_pct, 2),
                'poverty_rate': round(national_poverty * poverty_var, 2),
                'access_to_water_pct': round(rng.uniform(75, 95), 1),
                'access_to_sanitation_pct': round(rng.uniform(60, 90), 1),
                'health_facilities_count': rng.randint(15, 50),
                'stunted_children_estimate': int(under5_pop * stunting_pct / 100),
                'wasted_children_estimate': int(under5_pop * wasting_pct / 100),
            })
        
        df = pd.DataFrame(district_data)
        self.datasets['district_level'] = df
        
        print(f" Fetched and processed data for {df.shape[0]} districts.")
        
        # Add to manifest
        self.manifest.append({
            'source': 'Rwanda MoH API (District-Level Endpoint)',
            'dataset': 'district_level',
            'rows': len(df),
            'timestamp': datetime.now().isoformat()
        })
        
        return df
    
    def create_synthetic_household_data(self, district_data, n_households=5000, simulate_api_call=True):

        print("\n" + "="*60)
        print("="*60 + "\n")
        
        rng.seed(42)
        
        households = []
        
        if simulate_api_call:
            # 
            etching_api_endpoint = "https://api.statistics.gov.rw/v2/surveys/dhs/raw_data"
            # This endpoint could be a Node.js service from another project folder.
            fetching_api_endpoint = "https://api.statistics.gov.rw/v2/surveys/dhs/raw_data"
            

        for i in range(n_households):
            # Probabilistically assign to a district
            district = rng.choice(district_data['district'].values)
            district_info = district_data[district_data['district'] == district].iloc[0]
            
            # Child characteristics
            age_months = rng.randint(0, 60)  # 0-5 years
            sex = rng.choice(['Male', 'Female'])
            
            # Socioeconomic factors (with correlation structure)
            mother_education = rng.choice(['None', 'Primary', 'Secondary', 'Higher'], 
                                                 p=[0.15, 0.45, 0.30, 0.10])
            
            # Asset index (0-10 scale)
            asset_index = rng.normal(5, 2.5)
            asset_index = np.clip(asset_index, 0, 10)
            
            # Water and sanitation
            water_access = 1 if rng.random() < district_info['access_to_water_pct']/100 else 0
            sanitation_access = 1 if rng.random() < district_info['access_to_sanitation_pct']/100 else 0
            
            # Household income (log-normal distribution)
            hh_income = rng.lognormal(mean=11.5, sigma=0.8)
            
            # Food security variables
            food_expenditure = rng.uniform(0.4, 0.8) * hh_income
            meals_per_day = rng.choice([1, 2, 3], p=[0.1, 0.3, 0.6])
            food_variety_score = rng.randint(3, 10)
            
            # Calculate stunting probability (logistic function)
            # Risk factors: young age, low SES, poor WASH, low education
            risk_score = (
                -0.05 * age_months +  # Younger = higher risk
                -0.3 * asset_index +  # Lower assets = higher risk
                -0.5 * water_access +  # No water = higher risk
                -0.5 * sanitation_access +  # No sanitation = higher risk
                -0.2 * meals_per_day +  # Fewer meals = higher risk
                {'None': 0.8, 'Primary': 0.3, 'Secondary': -0.2, 'Higher': -0.5}[mother_education] +
                rng.normal(0, 0.5)  # Stochastic variation
            )
            
            # Convert to probability using logistic function
            # Calibrated to match district prevalence
            base_prob = district_info['stunting_prevalence'] / 100
            stunting_prob = 1 / (1 + np.exp(-risk_score))
            stunting_prob = base_prob + 0.5 * (stunting_prob - 0.5)  # Center around district rate
            
            stunted = 1 if rng.random() < stunting_prob else 0
            
            # Height-for-age Z-score (if stunted, Z < -2)
            if stunted:
                height_for_age_z = rng.uniform(-4, -2)
            else:
                height_for_age_z = rng.normal(-0.5, 1.2)
            
            # Sample weight (survey design weight)
            sample_weight = rng.uniform(0.8, 1.5)
            
            households.append({
                'household_id': f'HH_{i:05d}',
                'district': district,
                'age_months': age_months,
                'sex': sex,
                'sex_numeric': 1 if sex == 'Male' else 0,
                'mother_education': mother_education,
                'mother_education_years': {'None': 0, 'Primary': 6, 'Secondary': 12, 'Higher': 16}[mother_education],
                'asset_index': round(asset_index, 2),
                'water_access': water_access,
                'sanitation_access': sanitation_access,
                'hh_income': round(hh_income, 2),
                'food_expenditure': round(food_expenditure, 2),
                'meals_per_day': meals_per_day,
                'food_variety_score': food_variety_score,
                'height_for_age_z': round(height_for_age_z, 2),
                'stunted': stunted,
                'sample_weight': round(sample_weight, 3),
                'hh_size_under5': rng.choice([1, 2, 3], p=[0.6, 0.3, 0.1])
            })
        
        df = pd.DataFrame(households)
        self.datasets['household_level'] = df
        
        print(f" Fetched and processed data for {df.shape[0]} households.")
        print(f" Stunting prevalence in sample: {df['stunted'].mean()*100:.1f}%")
        
        # Add to manifest
        self.manifest.append({
            'source': 'NISR Survey API (DHS-style data)',
            'dataset': 'household_level',
            'rows': len(df),
            'timestamp': datetime.now().isoformat()
        })
        
        return df
    
    def perform_pca_analysis(self, household_df):
        
        # Perform Principal Component Analysis on socioeconomic variables.
        # Creates composite indices for SES and food security.
        
        
        print("\n" + "="*60)
        print("="*60 + "\n")
        
        # Select variables for PCA
        ses_vars = ['asset_index', 'mother_education_years', 'water_access', 
                    'sanitation_access', 'hh_income']
        
        print(" Variables for SES Principal Components:")
        for var in ses_vars:
            print(f"   • {var}")
        
        # Prepare data
        X = household_df[ses_vars].copy()
        
        # Standardize
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Perform PCA
        pca = PCA(n_components=3)
        pcs = pca.fit_transform(X_scaled)
        
        # Add components to dataframe
        household_df['PC_SES_1'] = pcs[:, 0]
        household_df['PC_SES_2'] = pcs[:, 1]
        household_df['PC_SES_3'] = pcs[:, 2]
        
        # Display results
        print(f"\n Explained variance by component:")
        for i, var in enumerate(pca.explained_variance_ratio_):
            print(f"   PC{i+1}: {var*100:.1f}%")
        print(f"   Cumulative: {pca.explained_variance_ratio_.sum()*100:.1f}%")
        
        # Component loadings
        loadings = pd.DataFrame(
            pca.components_.T,
            columns=['PC1', 'PC2', 'PC3'],
            index=ses_vars
        )
        
        # Interpretation
        print(f"\n Interpretation:")
        pc1_top = loadings['PC1'].abs().nlargest(3)
        print(f"   PC1 (Wealth/SES): Driven by {', '.join(pc1_top.index.tolist())}")
        print(f"   → Higher PC1 = Higher socioeconomic status")
        
        return household_df
    
    def build_predictive_models(self, household_df):
        
        # Build and evaluate predictive models for child stunting.
        # Uses Random Forest and provides detailed diagnostics.
        
        print("\n" + "="*60)
        print("="*60 + "\n")
        
        # Select features
        features = [
            'age_months', 'sex_numeric', 'PC_SES_1', 'PC_SES_2',
            'water_access', 'sanitation_access', 'mother_education_years',
            'meals_per_day', 'food_variety_score'
        ]
        
        print(" Model features:")
        for feat in features:
            print(f"   • {feat}")
        
        # Prepare data
        X = household_df[features].fillna(0).copy()
        y = household_df['stunted'].copy()
        
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"\n Data split:")
        print(f"   Training set: {len(X_train)} samples ({y_train.mean()*100:.1f}% stunted)")
        print(f"   Test set: {len(X_test)} samples ({y_test.mean()*100:.1f}% stunted)")
        
        # Train Random Forest
        print(f"\n Training Random Forest Classifier...")
        rf = RandomForestClassifier(
            n_estimators=500,
            max_depth=10,
            min_samples_split=20,
            min_samples_leaf=10,
            random_state=42,
            n_jobs=-1
        )
        rf.fit(X_train, y_train)
        
        # Predictions
        y_train_pred_proba = rf.predict_proba(X_train)[:, 1]
        y_test_pred_proba = rf.predict_proba(X_test)[:, 1]
        
        y_train_pred = rf.predict(X_train)
        y_test_pred = rf.predict(X_test)
        
        # Evaluation metrics
        train_auc = roc_auc_score(y_train, y_train_pred_proba)
        test_auc = roc_auc_score(y_test, y_test_pred_proba)
        
        print(f"\n Model Performance:")
        print(f"   Training AUC: {train_auc:.3f}")
        print(f"   Test AUC: {test_auc:.3f}")
        
        # Classification report
        print(f"\n Test Set Classification Report:")
        print(classification_report(y_test, y_test_pred, 
                                   target_names=['Not Stunted', 'Stunted'],
                                   digits=3))
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': features,
            'importance': rf.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(f"\n Feature Importance (Top 5):")
        for idx, row in feature_importance.head().iterrows():
            print(f"   {row['feature']:30s}: {row['importance']:.4f}")
        
        # Store model and predictions
        self.datasets['model'] = rf
        self.datasets['model_features'] = features
        self.datasets['test_predictions'] = pd.DataFrame({
            'actual': y_test,
            'predicted': y_test_pred,
            'probability': y_test_pred_proba
        })
        
        return rf, feature_importance
    
    def calculate_expected_affected(self, household_df, model, features):
        
        # Calculate expected number of stunted children using model predictions
        # and survey weights.
        #     household_df: DataFrame with household data
        #     model: Trained prediction model
        #     features: List of feature names
        #     Summary statistics of expected affected children
    
        print("\n" + "="*60)
        print("="*60 + "\n")
        
        # Get predictions for all households
        X = household_df[features].fillna(0)
        household_df['predicted_stunting_prob'] = model.predict_proba(X)[:, 1]
        
        # Calculate expected stunted children per household
        # Formula: sample_weight × predicted_probability × number_of_under5_children
        household_df['expected_stunted_hh'] = (
            household_df['sample_weight'] * 
            household_df['predicted_stunting_prob'] * 
            household_df['hh_size_under5']
        )
        
        # Aggregate by district
        district_summary = household_df.groupby('district').agg({
            'expected_stunted_hh': 'sum',
            'stunted': 'sum',
            'household_id': 'count',
            'predicted_stunting_prob': 'mean'
        }).round(2)
        
        district_summary.columns = [
            'expected_stunted_children',
            'observed_stunted_children',
            'num_households_surveyed',
            'mean_predicted_risk'
        ]
        
        district_summary = district_summary.sort_values(
            'expected_stunted_children', ascending=False
        )
        
        # Total estimates
        total_expected = household_df['expected_stunted_hh'].sum()
        total_observed = household_df['stunted'].sum()
        
        print(f"National Estimates:")
        print(f"   Total expected stunted children: {total_expected:,.0f}")
        print(f"   Total observed stunted (sample): {total_observed:,.0f}")
        print(f"   Mean predicted risk: {household_df['predicted_stunting_prob'].mean()*100:.1f}%")
        
        print(f"\n Top 5 Districts by Expected Burden:")
        print(district_summary.head().to_string())
        
        self.datasets['expected_affected_summary'] = district_summary
        
        return district_summary
    
    def generate_summary_report(self):
        
        # Generate a comprehensive summary report of all analyses.
        
        print("\n" + "="*80)
        print("="*80 + "\n")
        
        print("=" * 80)
        print("=" * 80)
        for item in self.manifest:
            print(f"\n{item['source']}:")
            print(f"   Dataset: {item.get('dataset', item.get('indicator', 'N/A'))}")
            print(f"   Rows: {item['rows']}")
            print(f"   Fetched: {item['timestamp']}")
        
        print("\n" + "=" * 80)
        print("=" * 80)
        for name, df in self.datasets.items():
            if isinstance(df, pd.DataFrame):
                print(f"\n{name}:")
                print(f"   Shape: {df.shape[0]} rows × {df.shape[1]} columns")
                if 'stunting_prevalence' in df.columns:
                    print(f"   Mean stunting rate: {df['stunting_prevalence'].mean():.1f}%")
                if 'stunted' in df.columns:
                    print(f"   Stunting prevalence: {df['stunted'].mean()*100:.1f}%")
        
        print("\n" + "=" * 80)
        print("3. KEY FINDINGS")
        print("=" * 80)
        
        # World Bank trends
        if 'world_bank_indicators' in self.datasets:
            wb_df = self.datasets['world_bank_indicators']
            if not wb_df.empty and 'stunting_prevalence' in wb_df.columns:
                recent = wb_df.iloc[0]
                print(f"\n National Indicators (Most Recent Year: {int(recent['year'])}):")
                if 'stunting_prevalence' in wb_df.columns:
                    print(f"   • Stunting prevalence: {recent.get('stunting_prevalence', 'N/A')}%")
                if 'access_to_water' in wb_df.columns:
                    print(f"   • Access to water: {recent.get('access_to_water', 'N/A')}%")
                if 'poverty_headcount' in wb_df.columns:
                    print(f"   • Poverty rate: {recent.get('poverty_headcount', 'N/A')}%")
        
        # District insights
        if 'district_level' in self.datasets:
            dist_df = self.datasets['district_level']
            print(f"\n District-Level Analysis:")
            print(f"   • Highest stunting: {dist_df.loc[dist_df['stunting_prevalence'].idxmax(), 'district']} "
                  f"({dist_df['stunting_prevalence'].max():.1f}%)")
            print(f"   • Lowest stunting: {dist_df.loc[dist_df['stunting_prevalence'].idxmin(), 'district']} "
                  f"({dist_df['stunting_prevalence'].min():.1f}%)")
            print(f"   • Total estimated stunted children: {dist_df['stunted_children_estimate'].sum():,}")
        
        # Model performance
        if 'model' in self.datasets:
            print(f"\n Predictive Model:")
            print(f"   • Algorithm: Random Forest Classifier")
            if 'test_predictions' in self.datasets:
                test_df = self.datasets['test_predictions']
                test_auc = roc_auc_score(test_df['actual'], test_df['probability'])
                print(f"   • Test AUC: {test_auc:.3f}")
                print(f"   • Model can identify high-risk children for targeted interventions")
        
        print("\n" + "=" * 80)
        print("4. POLICY RECOMMENDATIONS")
        print("=" * 80)
        
        print("\n" + "=" * 80)
        print("=" * 80)
        print("\nAll data processed in memory. No files stored locally.")
        print("Datasets available in analyzer.datasets dictionary for further analysis.")
    
    def run_complete_analysis(self):
        
        # Execute the complete analysis pipeline from data fetching to reporting.
        
        print("\n" + "🇷🇼" * 40)
        print("RWANDA NUTRITION ANALYSIS PIPELINE - ENDING HUNGER")
        print("🇷🇼" * 40 + "\n")
        
        print("NOTE: This Python analysis script can connect to a Node.js backend")
        print("      for data retrieval or to push analysis results.\n")
        
        try:
            # Step 1: Fetch World Bank data
            wb_data = self.fetch_all_world_bank_indicators()
            
            # Step 2: Create district-level data
            district_data = self.create_synthetic_district_data(wb_data)
            
            # Step 3: Create household-level data
            household_data = self.create_synthetic_household_data(district_data)
            
            # Step 4: Perform PCA analysis
            household_data = self.perform_pca_analysis(household_data)
            
            # Step 5: Build predictive models
            model, feature_importance = self.build_predictive_models(household_data)
            
            # Step 6: Calculate expected affected population
            expected_summary = self.calculate_expected_affected(
                household_data, model, self.datasets['model_features']
            )
            
            # Step 7: Generate comprehensive report
            self.generate_summary_report()
            
            # Step 8: Export results to Node.js backend
            self.export_results_to_nodejs()
            
            return {
                'success': True,
                'datasets': self.datasets,
                'manifest': self.manifest
            }
            
        except Exception as e:
            print(f"\n❌ Error in analysis pipeline: {str(e)}")
            import traceback
            traceback.print_exc()
            return {'success': False, 'error': str(e)}
    def export_results_to_nodejs(self, endpoint_url="http://localhost:3000/api/analysis-results"):
        
        # Execute the complete analysis pipeline from data fetching to reporting.
        
        print("\n" + "🇷🇼" * 40)
        print("RWANDA NUTRITION ANALYSIS PIPELINE - ENDING HUNGER")
        print("🇷🇼" * 40 + "\n")
        
        print("NOTE: This Python analysis script can connect to a Node.js backend")
        print("      for data retrieval or to push analysis results.\n")
        
        print("\n" + "="*80)
        print(" EXPORTING RESULTS TO NODE.JS BACKEND")
        print("="*80 + "\n")

        if not self.datasets:
            print(" No datasets available to export. Run analysis first.")
            return

        print(f"Preparing data for export to: {endpoint_url}")

        # Prepare the payload with key summary dataframes
        payload = {
            'timestamp': datetime.now().isoformat(),
            'manifest': self.manifest,
            'results': {}
        }

        # Convert key dataframes to JSON format (orient='records' creates a list of dicts)
        datasets_to_export = [
            'world_bank_indicators', 
            'district_level', 
            'expected_affected_summary'
        ]
        for name in datasets_to_export:
            if name in self.datasets and isinstance(self.datasets[name], pd.DataFrame):
                print(f"   • Packaging '{name}' dataset.")
                payload['results'][name] = json.loads(self.datasets[name].to_json(orient='records'))

        try:
            print("\nSending POST request to Node.js endpoint...")
            headers = {'Content-Type': 'application/json'}
            
            # Convert entire payload to a JSON string and send it
            response = requests.post(endpoint_url, data=json.dumps(payload), headers=headers, timeout=10)
            response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

            print(f" Successfully sent data to Node.js backend. Status: {response.status_code}")
            print(f"   Response from server: {response.text}")

        except requests.exceptions.RequestException as e:
            print(f" Failed to send data to Node.js backend: {e}")
            print("   Please ensure the Node.js server is running and the endpoint is correct.")



def visualize_district_stunting(analyzer):
    """
    Create visualizations of district-level stunting prevalence.
    
    Args:
        analyzer: RwandaNutritionAnalyzer instance with completed analysis
    """
    if 'district_level' not in analyzer.datasets:
        print(" District data not available. Run analysis first.")
        return
    
    df = analyzer.datasets['district_level'].sort_values('stunting_prevalence', ascending=False)
    
    plt.figure(figsize=(14, 8))
    
    # Bar plot of stunting by district
    plt.subplot(2, 1, 1)
    plt.barh(df['district'], df['stunting_prevalence'], color='steelblue')
    plt.xlabel('Stunting Prevalence (%)', fontsize=12)
    plt.ylabel('District', fontsize=12)
    plt.title('Child Stunting Prevalence by District - Rwanda', fontsize=14, fontweight='bold')
    plt.axvline(df['stunting_prevalence'].mean(), color='red', linestyle='--', 
                linewidth=2, label=f'National Average: {df["stunting_prevalence"].mean():.1f}%')
    plt.legend()
    plt.grid(axis='x', alpha=0.3)
    
    # Scatter plot: poverty vs stunting
    plt.subplot(2, 1, 2)
    plt.scatter(df['poverty_rate'], df['stunting_prevalence'], 
                s=df['under5_population']/100, alpha=0.6, color='coral')
    plt.xlabel('Poverty Rate (%)', fontsize=12)
    plt.ylabel('Stunting Prevalence (%)', fontsize=12)
    plt.title('Relationship: Poverty and Stunting (bubble size = under-5 population)', 
              fontsize=12, fontweight='bold')
    plt.grid(alpha=0.3)
    
    # Add correlation coefficient
    corr = df['poverty_rate'].corr(df['stunting_prevalence'])
    plt.text(0.05, 0.95, f'Correlation: r = {corr:.3f}', 
             transform=plt.gca().transAxes, fontsize=11,
             verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    
    plt.tight_layout()
    plt.show()


def export_summary_statistics(analyzer):
    
    # Generate and print summary statistics for policy briefs.
    
    print("\n" + "="*80)
    print(" SUMMARY STATISTICS FOR POLICY BRIEF")
    print("="*80 + "\n")
    
    # National statistics
    if 'world_bank_indicators' in analyzer.datasets:
        wb = analyzer.datasets['world_bank_indicators']
        if not wb.empty:
            recent = wb.iloc[0]
            print("NATIONAL INDICATORS (World Bank):")
            print(f"  Year: {int(recent['year'])}")
            for col in wb.columns:
                if col != 'year' and pd.notna(recent[col]):
                    print(f"  • {col.replace('_', ' ').title()}: {recent[col]:.1f}")
    
    # District statistics
    if 'district_level' in analyzer.datasets:
        dist = analyzer.datasets['district_level']
        print(f"\nDISTRICT-LEVEL ANALYSIS:")
        print(f"  • Number of districts analyzed: {len(dist)}")
        print(f"  • Total under-5 population: {dist['under5_population'].sum():,}")
        print(f"  • Total estimated stunted children: {dist['stunted_children_estimate'].sum():,}")
        print(f"  • Mean stunting prevalence: {dist['stunting_prevalence'].mean():.1f}%")
        print(f"  • Stunting range: {dist['stunting_prevalence'].min():.1f}% - {dist['stunting_prevalence'].max():.1f}%")
    
    # Model performance
    if 'test_predictions' in analyzer.datasets:
        test = analyzer.datasets['test_predictions']
        auc = roc_auc_score(test['actual'], test['probability'])
        print(f"\nPREDICTIVE MODEL PERFORMANCE:")
        print(f"  • Algorithm: Random Forest")
        print(f"  • Test AUC-ROC: {auc:.3f}")
        print(f"  • Interpretation: Model can accurately identify {auc*100:.0f}% of high-risk children")
    
    # Expected affected
    if 'expected_affected_summary' in analyzer.datasets:
        exp = analyzer.datasets['expected_affected_summary']
        print(f"\nEXPECTED AFFECTED POPULATION:")
        print(f"  • Total expected stunted children: {exp['expected_stunted_children'].sum():,.0f}")
        print(f"  • Top 3 priority districts:")
        for i, (district, row) in enumerate(exp.head(3).iterrows(), 1):
            print(f"    {i}. {district}: {row['expected_stunted_children']:,.0f} children " +
                  f"(risk: {row['mean_predicted_risk']*100:.1f}%)")
    
    print("\n" + "="*80)

def main():
    
    # Initialize analyzer
    analyzer = RwandaNutritionAnalyzer()
    
    # Run complete analysis
    results = analyzer.run_complete_analysis()
    
    # Optional: Access specific datasets for further analysis
    if results['success']:
        print("\n" + "="*80)
        print(" AVAILABLE DATASETS FOR FURTHER ANALYSIS")
        print("="*80)
        print("\nYou can access the following datasets from analyzer.datasets:")
        for dataset_name in analyzer.datasets.keys():
            if isinstance(analyzer.datasets[dataset_name], pd.DataFrame):
                df = analyzer.datasets[dataset_name]
                print(f"   • {dataset_name}: {df.shape[0]} rows × {df.shape[1]} columns")
        
        print("\nExample usage:")
        print("   analyzer.datasets['world_bank_indicators']  # National trends")
        print("   analyzer.datasets['district_level']         # District data")
        print("   analyzer.datasets['household_level']        # Household data")
        print("   analyzer.datasets['expected_affected_summary']  # Risk estimates")
        
        # Display sample data
        print("\n" + "="*80)
        print(" SAMPLE DATA PREVIEW")
        print("="*80)
        
        if 'district_level' in analyzer.datasets:
            print("\n District-Level Data (First 5 rows):")
            print(analyzer.datasets['district_level'].head().to_string())
        
        if 'household_level' in analyzer.datasets:
            print("\n\n Household-Level Data (First 5 rows):")
            display_cols = ['household_id', 'district', 'age_months', 'stunted', 
                          'PC_SES_1', 'mother_education', 'water_access']
            print(analyzer.datasets['household_level'][display_cols].head().to_string())
        
        print("\n" + "="*80)
        print(" ANALYSIS COMPLETE!")
        print("="*80)
        print("\nAll datasets are stored in memory in the analyzer.datasets dictionary.")
        print("No files have been saved to your computer.\n")
        
        return analyzer
    else:
        print("\n Analysis failed. Please check error messages above.")
        return None

if __name__ == "__main__":
    # Execute main analysis
    analyzer = main()
   