package automation.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

public class ExtentManager
{
	private static ExtentReports extent;
	
	public static ExtentReports getExtentReports()
	{
		if(extent==null)
		{
			//Set up HTML reporter path
			ExtentSparkReporter sparkreporter = new ExtentSparkReporter("test-output/ExtentReport.html");
			sparkreporter.config().setReportName("Playwright Automation Report");
			sparkreporter.config().setDocumentTitle("Test Execution Report");
			
			//Create ExtentReports and attach reporter
            extent = new ExtentReports();
            extent.attachReporter(sparkreporter);
            extent.setSystemInfo("Tester", "Chinmay Agrawal");
            extent.setSystemInfo("Environment", "QA");
		}
		return extent;
	}
}