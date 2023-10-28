import csv
# Read data from CSV and extract headers


def read_data_and_headers_from_csv(csv_file):
    with open(csv_file, newline='') as file:
        reader = csv.DictReader(file)
        data = list(reader)
        headers = reader.fieldnames  # Extract headers
    return headers, data

# Load data as dataContent for prompt


def load_datafile(file_path):
    headers, data = read_data_and_headers_from_csv(file_path)
    # Create a formatted data string
    formatted_data = "\n".join(
        [",".join([item[header] for header in headers]) for item in data])

    # Create the prompt with headers and data
    data_headers = ",".join(headers)  # Join headers with commas
    dataContent = f"\n{data_headers}\n{formatted_data}\n\n"
    return dataContent

# process prompts for data analysis requirements


def dataAnalysis(user_input, analysis_type, input_file):
    # user_input: input analysis requirements : string
    # input_file: uploaded file path : string
    # return user_message for apiCall()
    dataContent = load_datafile(input_file)
    user_message = f"My question is:{user_input}\nThis is the data:{dataContent}"
    prompt_type = f"You are a professional data analyst, proficient in {analysis_type}. "

    return prompt_type, user_message

# process prompts for data retrieval requirements


def dataRetrieval(user_input):
    # user_input: input data retrieval requirements : string

    # define the data tables and headers
    data_tables = {
        "customers": ["customerid", "customerName", "phone", "gender", "age"],
        "merchants": ["merchantId", "merchantName"],
        "orders": ["orderId", "customerid", "customerName", "merchantid", "merchantName", "productId", "productName", "ordertime", "quantity", "amount"],
        "products": ["productId", "productName", "productCategory", "unitPrice"],
    }
    prompt = (f"The database is sqlite3.\n"
              f"Given the following data tables:\n{data_tables}\n"
              f"\nUser Request: {user_input}\n"
              f"Generate a SQL query to get data that fulfill this request.Just give the SQL query.")
    prompt_type = "You are a data engineer. Write a SQL query to retrieve data from the database."

    return prompt_type, prompt

# process prompts for visualization suggestions
def visualization(analysis_type, dataContent):
    chart_types = ["line", "bar", "scatter", "pie", "histogram"]
    prompt_type = (f"You are a data visualization engineer.\n "
                   f"Visualize the data provided to assist the analysis of:{analysis_type}")
    prompt = (f"This is the data:{dataContent}\n"
              f"Give out headers of x-axis and y-axis, and the suggested chart type select from {chart_types}\n"
              f"Answer format: X:x-axis header, Y:y-axis header, Type:chart type\n")

    return prompt_type, prompt
