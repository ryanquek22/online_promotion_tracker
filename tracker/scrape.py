from selenium import webdriver
import time
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def scrape():
    #options = webdriver.ChromeOptions()
    #options.headless = True
    #driver = webdriver.Chrome(options=options)
    driver = webdriver.Chrome()
    # Step 5: Navigate to the webpage using Selenium
    driver.get('https://www.datacamp.com/')

    # scroll down to the bottom and scroll back to the top
    driver.execute_script("""
        (function () {
            var y = 0;
            var step = 100;
            window.scroll(0, 0);

            function f() {
                if (y < document.body.scrollHeight) {
                    y += step;
                    window.scroll(0, y);
                    setTimeout(f, 100);
                } else {
                    window.scroll(0, 0);
                    document.title += "scroll-done";
                }
            }

            setTimeout(f, 1000);
        })();
    """)

    for i in range(30):
        if "scroll-done" in driver.title:
            break
        time.sleep(10)
        print(i)

    # Step 6: Find elements with the desired class using Selenium
    #elements = driver.find_elements_by_class_name('dc-ps-banner-time-set')
    '''
    elements = driver.find_elements(By.CLASS_NAME, 'dc-ps-banner-wrapper')

    # Step 7: Extract the values from the found elements using Selenium
    for element in elements:
        value = element.text
        print(value)
    '''
    elements = driver.find_elements(By.CLASS_NAME, 'dc-ps-banner-time-set')

    output = round(time.time()*1000)
    mutliplier = [1000 * 60 * 60 * 24, 1000 * 60 * 60, 1000 * 60, 1000]
    index = 0
    # Step 7: Extract the values from the found elements using Selenium
    for element in elements:
        value = element.text
        print(value)
        #print(type(value))
        print(int(value[0:len(value)-1]))
        output += int(value[0:len(value)-1]) * mutliplier[index]
        index +=1
        

    # Step 8: Close the WebDriver instance
    driver.quit()
    return output

scrape()