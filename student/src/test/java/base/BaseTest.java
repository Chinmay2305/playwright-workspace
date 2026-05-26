package base;

import org.testng.annotations.*;
import com.microsoft.playwright.Page;
import utils.PlaywrightFactory;

import java.nio.file.Paths;

public class BaseTest {
    protected Page page;

    @BeforeMethod
    public void setup() {
        page = PlaywrightFactory.initBrowser();
    }

    @AfterMethod
    public void tearDown() {
        // Screenshot on failure handled later
        PlaywrightFactory.tearDown();
    }

    public void takeScreenshot(String name) {
        page.screenshot(new Page.ScreenshotOptions()
                .setPath(Paths.get("screenshots/" + name + ".png")));
    }
}