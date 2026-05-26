package gettingstarted;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.assertions.PlaywrightAssertions;

public class LoginLogout
{
	public static void main(String[] args)
	{
		Browser browser = null;
		Page page = null;
		try
		{
			browser = Playwright.create().chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
			page = browser.newPage();
			page.navigate("https://freelance-learn-automation.vercel.app/login");
			page.waitForLoadState();
			PlaywrightAssertions.assertThat(page).hasTitle("Learn Automation Courses");
//			page.locator("#email1").fill("admin@email.com");
			page.locator("xpath=//input[@name='email1']").fill("admin@email.com");
			page.waitForTimeout(3000);
		}
		finally
		{
//			page.close();
//			browser.close();
		}
	}
}