package automation.tests;

import automation.tests.BaseTest;
import automation.PageObject.LoginPage;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test
    public void verifyLogin() {

        LoginPage login = new LoginPage(page);

        login.login(
            prop.getProperty("user"),
            prop.getProperty("pwd")
        );

        page.waitForURL("**dashboard**");
    }
}