package automation.tests;

import com.microsoft.playwright.*;
import org.testng.annotations.*;
import java.util.Properties;
import java.io.FileInputStream;

public class BaseTest {

    protected Playwright playwright;
    protected Browser browser;
    protected BrowserContext context;
    protected Page page;
    protected Properties prop;

    @BeforeMethod
    public void setup() throws Exception {

        // Load properties
        prop = new Properties();
        FileInputStream fis = new FileInputStream("Resources/login.properties");
        prop.load(fis);

        playwright = Playwright.create();

        String browserName = System.getProperty("browser", "chromium");

        switch (browserName) {
            case "firefox":
                browser = playwright.firefox().launch();
                break;
            case "webkit":
                browser = playwright.webkit().launch();
                break;
            default:
                browser = playwright.chromium().launch();
        }

        context = browser.newContext();
        page = context.newPage();

        page.navigate(prop.getProperty("QAURL"));
    }

    @AfterMethod
    public void teardown() {
        context.close();
        browser.close();
        playwright.close();
    }
}