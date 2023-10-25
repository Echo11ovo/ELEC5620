import openai


openai.api_key = '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'
# Interact with OpenAI API


def apiCall(prompt_type, user_message):
    # prompt_type: analysis requirements/ data retrieval requirements
    # user_message: user input
    prompt_messages = [{'role': 'system', 'content': prompt_type},
                       {'role': 'user', 'content': user_message}]
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=prompt_messages,
            max_tokens=200,
            temperature=0.9
        )
        response_message = response.choices[0].message['content'].strip()
        # return response from the ChatGPT API
        return response_message
    except Exception as e:
        # return error response
        return f"Error: {str(e)}"
