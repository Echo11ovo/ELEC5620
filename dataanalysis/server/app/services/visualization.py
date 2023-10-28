''' add this file to server/app/services/visualization.py '''

import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('agg')
import io
from datetime import datetime
from matplotlib.cm import get_cmap
from random import random
import base64

# extract x-axis, y-axis, chart type from gpt response
def extract_chart_parameters(input_string):
    # Split the input_string by commas
    parts = input_string.split(', ')

    x_column = None
    y_column = None
    chart_type = None

    # Iterate through the parts to extract X, Y, and Type
    for part in parts:
        if part.startswith('X: '):
            x_column = part[3:]
        elif part.startswith('Y: '):
            y_column = part[3:]
        elif part.startswith('Type: '):
            chart_type = part[6:]

    return x_column, y_column, chart_type

# process and extract x-data and y-data from read data
def process_xy_data(data, x_header, y_header):
    # Extract column from the data
    x_data = [row[x_header] for row in data]
    y_data = [float(row[y_header]) for row in data]

    if x_header == 'ordertime':
        # Convert ordertimes to date objects
        #date_objects = [datetime.strptime(ordertime, "%Y/%m/%d %H:%M").date() for ordertime in x_data]
        date_objects = [datetime.strptime(ordertime, "%Y-%m-%d %H:%M:%S").date() for ordertime in x_data]

        # Create a list of (date, y_value) pairs
        data_pairs = list(zip(date_objects, y_data))

        # Sort the data_pairs based on the date
        data_pairs.sort(key=lambda pair: pair[0])

        # Split the sorted pairs back into x_data and y_data
        x_data, y_data = zip(*data_pairs)

    # Create a dictionary to aggregate the sums
    data_dict = {}
    for x, y in zip(x_data, y_data):
        if x in data_dict:
            data_dict[x] += y
        else:
            data_dict[x] = y

    # Extract the x_data and the aggregated y_data from the dictionary
    x_data = list(data_dict.keys())
    y_data = list(data_dict.values())

    # Transform y_data to floating-point numbers with two decimal places
    y_data = [round(y, 2) for y in y_data]

    return x_data, y_data

# Line chart
def line_chart(x_data, y_data):
    plt.plot(x_data, y_data, marker='o', linestyle='-', markersize=5)


# Bar chart
def bar_chart(x_data, y_data):
    # Create a colormap (you can choose a different one if you prefer)
    cmap = get_cmap('Blues')
    # Generate a random color for each bar based on the colormap
    colors = [cmap(random()) for _ in range(len(x_data))]

    bars = plt.bar(x_data, y_data, color=colors)
    # Label the bars with their respective values
    # for bar, value in zip(bars, y_data):
    #     plt.text(bar.get_x() + bar.get_width() / 2 - 0.4, bar.get_height() + 30, str(value), fontsize=10)

def pie_chart(x_data, y_data):
    cmap = get_cmap('Blues')
    # Generate a random color for each bar based on the colormap
    colors = [cmap(random()) for _ in range(len(x_data))]
    labels = x_data
    sizes = y_data
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)


def generate_chart(x_header, y_header, x_data, y_data, chart_type):
    # Create a new figure
    plt.figure(figsize=(10, 6))

    if chart_type == 'line':
        line_chart(x_data, y_data)

    elif chart_type == 'bar':
        bar_chart(x_data, y_data)

    elif chart_type =='pie':
        pie_chart(x_data, y_data)

    if chart_type != 'pie':
        # Customize chart labels and title
        plt.xlabel(x_header)
        plt.ylabel(y_header)

    # Display or save the chart
    plt.tight_layout()  # Adjusts spacing
    # plt.show()  # Display the chart

    # Save the chart to a BytesIO buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    chart_data = base64.b64encode(buffer.read()).decode()
    # print(chart_data)
    return chart_data
