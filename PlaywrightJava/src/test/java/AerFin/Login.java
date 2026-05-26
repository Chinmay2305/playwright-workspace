package AerFin;

import java.nio.file.Paths;
import java.util.Arrays;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import com.microsoft.playwright.options.LoadState;

public class Login
{
	public static void main(String[] args) throws InterruptedException
	{
		try(Playwright pw = Playwright.create())
		{
			BrowserType.LaunchOptions launchOptions = new BrowserType.LaunchOptions()
                    .setHeadless(false)
                    .setArgs(Arrays.asList("--start-maximized"));
			Browser b = pw.chromium().launch(launchOptions);
			BrowserContext context = b.newContext(new Browser.NewContextOptions().setViewportSize(null));
			
			Page p = context.newPage();
			p.navigate("https://qa.aerfinity.acumenaviation.in/");
			System.out.println(p.title());
			PlaywrightAssertions.assertThat(p).hasTitle("AerFinity");
			System.out.println(p.url());
			p.waitForLoadState(LoadState.NETWORKIDLE);
			//p.locator("#email").fill("support@acumen.aero");
			//p.locator("xpath=//input[@name='email']").fill("support@acumen.aero");
			//p.locator("css=input[name='email']").fill("support@acumen.aero");
			
			p.getByPlaceholder("johndoe@xyz.com").fill("support@acumen.aero");
			p.locator("#password").fill("Acumen@123");
			p.locator("//button[text()='Login']").click();
			
			PlaywrightAssertions.assertThat(p.getByText("Pinned Graphs")).isVisible();
			
			p.waitForTimeout(3000);
			
			p.waitForLoadState(LoadState.NETWORKIDLE);
			p.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("1stshot.png")).setFullPage(true));
		}
	}
}