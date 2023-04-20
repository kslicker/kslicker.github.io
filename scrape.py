from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

# Set up the Chrome WebDriver
service = Service('path/to/chromedriver')
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(service=service, options=options)

# Load the Dunnes Stores website
url = 'https://www.dunnesstores.com/c/women/highlights/womens-summer-shop'
driver.get(url)

# Wait for the page to load and the JavaScript to finish executing
wait = WebDriverWait(driver, 30)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'product-card-title')))

# Find all the product titles and prices on the page
titles = driver.find_elements(By.CLASS_NAME, 'product-card-title')
prices = driver.find_elements(By.CLASS_NAME, 'product-card-price')

# Store the product titles and prices in a pandas DataFrame
data = {'Product Title': [], 'Price': []}
for i in range(len(titles)):
    title = titles[i].text.strip()
    price = prices[i].text.strip()
    data['Product Title'].append(title)
    data['Price'].append(price)

df = pd.DataFrame(data)

# Print the DataFrame
print(df)

# Quit the web driver
driver.quit()
