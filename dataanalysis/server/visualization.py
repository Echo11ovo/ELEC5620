import matplotlib.pyplot as plt
import pandas as pd


# visualization_prompt = "In addition, to assist visualization, you should suggest the suitable chart type and columns to use."
# format_prompt = "Answer with following format: Analysis insights: <answer> Chart Type: <chart type> Columns: <columns>"
# prompt_type = f"{prompt_type}\n{visualization_prompt}\n{format_prompt}"
def visualize_data(chart_type, csv_file, x_column, y_column):
    # Read data from the CSV file
    df = pd.read_csv(csv_file)

    x_data = df[x_column]
    y_data = df[y_column]

    if chart_type == 'line':
        plt.plot(x_data, y_data, marker='o')
        plt.xlabel(x_column)
        plt.ylabel(y_column)
        plt.title('Line Chart')
    elif chart_type == 'bar':
        plt.bar(x_data, y_data)
        plt.xlabel(x_column)
        plt.ylabel(y_column)
        plt.title('Bar Chart')
    elif chart_type == 'scatter':
        plt.scatter(x_data, y_data)
        plt.xlabel(x_column)
        plt.ylabel(y_column)
        plt.title('Scatter Plot')
    else:
        print('Unsupported chart type.')

    plt.show()


# Example usage
chart_type = 'bar'  # Change to 'bar' or 'scatter' as needed
csv_file = './uploads/sample_data.csv'  # Replace with your CSV file path
x_column = 'productName'  # Replace with the name of the X-axis column
y_column = 'quantity'  # Replace with the name of the Y-axis column

visualize_data(chart_type, csv_file, x_column, y_column)
