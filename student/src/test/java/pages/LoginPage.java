package pages;

import com.microsoft.playwright.Page;

public class LoginPage {

    private Page page;

    public LoginPage(Page page) {
        this.page = page;
    }

    String username = "//input[contains(@id,'username')]";
    String password = "//input[contains(@id,'password')]";
    String loginBtn = "//button";

    public void navigate() {
        page.navigate("https://student-devcode.vercel.app/");
    }

    public void login(String user, String pass) {
        // Auto-wait happens here automatically
        page.locator(username).fill(user);
        page.locator(password).fill(pass);
        page.locator(loginBtn).click();
    }
}