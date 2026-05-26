package automation.PageObject;

import com.microsoft.playwright.Page;

public class LoginPage {

    private Page page;

    public LoginPage(Page page) {
        this.page = page;
    }

    public void login(String user, String pass) {

        page.locator("//input[@id='email']").fill(user);
        page.locator("//input[contains(@id,'password')]").fill(pass);
        page.locator("//button[contains(@class,'MuiButton')]").click();
    }
}