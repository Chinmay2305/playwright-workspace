package tests;

import base.BaseTest;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.DashboardPage;
import utils.RetryAnalyzer;

public class LoginTest extends BaseTest {

    @Test(retryAnalyzer = RetryAnalyzer.class)
    public void loginAndAddStudentTest() {

        LoginPage login = new LoginPage(page);
        login.navigate();
        login.login("admin", "123");

        DashboardPage dash = new DashboardPage(page);
        dash.verifyDashboard();

        dash.addStudent("First", "50");
        dash.verifyStudent("First", "50");

        takeScreenshot("dashboard_success");
    }
}