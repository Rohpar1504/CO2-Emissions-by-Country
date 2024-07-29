import pandas as pd

df = pd.read_csv('/Users/rohanpareek/Desktop/CO2-Emissions-by-Country/data/co2_emissions_by_country.csv')

average_co2_per_year = df.loc[:, '1990':'2020'].mean()
average_co2_df = average_co2_per_year.reset_index()
average_co2_df.columns = ['year', 'value']

output_path = '/Users/rohanpareek/Desktop/CO2-Emissions-by-Country/data/global_average_data.csv'
average_co2_df.to_csv(output_path, index=False)