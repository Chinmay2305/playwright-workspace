package gettingstarted;

import java.io.IOException;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.CLI;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class FirstPlayWrightTest
{
	public static void main(String[] args)
	{
		Playwright pw = Playwright.create();
		BrowserType browsertype = pw.chromium();
//		BrowserType browsertype = pw.firefox();
		Browser browser = browsertype.launch(new BrowserType.LaunchOptions().setHeadless(false).setChannel("chrome"));
		Page page = browser.newPage();
		page.navigate("https://qa.aerfinity.acumenaviation.in/");
		String title = page.title();
		System.out.println("The title is: "+title);
/*		page.close();
		browser.close();
		pw.close();*/
	}
}