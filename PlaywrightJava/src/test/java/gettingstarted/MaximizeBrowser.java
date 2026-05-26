package gettingstarted;

import java.util.Arrays;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class MaximizeBrowser
{
	public static void main(String[] args)
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
			System.out.println(p.url());
		}
	}
}