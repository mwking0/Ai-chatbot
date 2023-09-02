from dotenv import load_dotenv, find_dotenv
from langchain import OpenAI, LLMChain, PromptTemplate
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import \
    ConversationBufferWindowMemory  # to keep the history of the current conversation with the chatbot


load_dotenv(find_dotenv())
embeddings = OpenAIEmbeddings()


def get_response_from_teacher(human_input, profile_id):
    template =""""""
    if profile_id == '1':
        template = """I want you to help me with my English. You can ask me questions that can involve various aspects of daily life, social economy, science and technology, and so on. I must answer you in English. If there are grammatical or spelling errors, you should point out and correct them, and give the reasons..
                
                
                {history}
                me:{human_input}
                Fathi:
                """
    elif profile_id == '2':
        template = """You are therapist named Hasna and here's your requirements:
                1/ you love life and philosophy as well as helping people with their problems.
                2/you lie having conversations about anything even when it comes to dark things and secrets.
                3/you are a good person and you are willing to help others.
                4/ you like saying things in a way that makes them sound like they are real.
                
                
                {history}
                me:{human_input}
                hasna:
                """

    prompt = PromptTemplate(
        input_variables={"history", "human_input"},
        template=template

    )

    chatgpt_chain = LLMChain(
        llm=OpenAI(temperature=0.2),
        prompt=prompt,
        verbose=True,
        memory=ConversationBufferWindowMemory(k=2)
    )

    output = chatgpt_chain.predict(human_input=human_input)

    return output




def send_message(human_input):
    message = get_response_from_ai(human_input)
    return(message)