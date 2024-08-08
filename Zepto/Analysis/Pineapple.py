import pandas as pd

# Load the provided CSV files
selected_items_list_path = '/mnt/data/Selected_Items_List.csv'
selected_items_list = pd.read_csv(selected_items_list_path)

data_path = '/mnt/data/output.csv'
data = pd.read_csv(data_path)

# Function to process each item and generate the analysis
def process_item(item, data):
    item_data = data[data['title'].str.contains(item, case=False, na=False)]
    
    if item_data.empty:
        return None

    # Hourly Price Analysis
    hourly_analysis = item_data.groupby(['day', 'hour']).agg({'selling_price': ['min', 'max']}).reset_index()
    hourly_analysis.columns = ['day', 'hour', 'Lowest Price (₹)', 'Highest Price (₹)']
    
    # Weather Impact Analysis
    weather_impact = item_data.groupby(['weather', 'hour']).agg({'selling_price': ['min', 'max']}).reset_index()
    weather_impact.columns = ['weather', 'hour', 'Lowest Price (₹)', 'Highest Price (₹)']
    
    # Discount Effect Analysis
    item_data['discount%'] = (item_data['selling_price'] / item_data['discounted_price']) * 100
    discount_effect = item_data.groupby(['discount%', 'hour']).agg({'selling_price': ['min', 'max']}).reset_index()
    discount_effect.columns = ['discount%', 'hour', 'Lowest Price (₹)', 'Highest Price (₹)']
    
    # Temperature Influence Analysis
    temperature_influence = item_data.groupby(['temperature', 'hour']).agg({'selling_price': ['min', 'max']}).reset_index()
    temperature_influence.columns = ['temperature', 'hour', 'Lowest Price (₹)', 'Highest Price (₹)']

    # Combine all results
    combined_results = pd.concat([hourly_analysis, weather_impact, discount_effect, temperature_influence], keys=['Hourly Price', 'Weather Impact', 'Discount Effect', 'Temperature Influence'])
    combined_results['Item'] = item
    return combined_results

# Process all items and collect results
results = []

for item in selected_items_list['Title']:
    result = process_item(item, data)
    if result is not None:
        results.append(result)

# Combine all results into a single DataFrame
final_results = pd.concat(results)

# Display the final results in table view
import ace_tools as tools;
tools.display_dataframe_to_user(name="Final Results Table", dataframe=final_results)
