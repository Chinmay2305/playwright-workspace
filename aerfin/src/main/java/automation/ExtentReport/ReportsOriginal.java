package automation.ExtentReport;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ReportsOriginal {

    private static ReportsOriginal instance;
    private static ExtentReports extent = null;
    private static ExtentTest logger;
    private static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MMddyyyyHHmmss");
    private static LocalDateTime currentdatetime = LocalDateTime.now();
    private static String reportPath;

    private ReportsOriginal() {
        reportPath = System.getProperty("user.dir") + File.separator + "Reports" + File.separator +
                "Aerfin_Report_" + dtf.format(currentdatetime) + ".html";

        ExtentSparkReporter reporter = new ExtentSparkReporter(reportPath);
        extent = new ExtentReports();
        extent.attachReporter(reporter);

        extent.setSystemInfo("Host Name", "AerFin Automation");
        extent.setSystemInfo("Environment", "QA");
        extent.setSystemInfo("User name", "Chinmay");

        reporter.config().setDocumentTitle("AERFIN AUTOMATION REPORT");
        reporter.config().setReportName("AERFIN AUTOMATION TEST REPORT");
        reporter.config().setTheme(Theme.STANDARD);
    }

    public static synchronized ReportsOriginal getInstance() {
        if (instance == null) {
            instance = new ReportsOriginal();
        }
        return instance;
    }

    public void startTest(String text) {
        if (extent == null) {
            throw new IllegalStateException("ExtentReports is not initialized.");
        }
        logger = extent.createTest(text);
    }

    public void log(Status status, String details) {
        if (logger == null) {
            throw new IllegalStateException("ExtentTest is not initialized. Call startTest() first.");
        }
        logger.log(status, details);
    }

    public void logSkip(String testName, String skipReason) {
        if (extent == null) {
            throw new IllegalStateException("ExtentReports is not initialized.");
        }
        if (logger == null) {
            startTest(testName);
        }
        logger.log(Status.SKIP, skipReason != null ? skipReason : "Test was skipped due to failure of previous tests.");
    }

    public void openReport() {
        try {
            File reportFile = new File(reportPath);
            if (reportFile.exists()) {
                Desktop.getDesktop().browse(reportFile.toURI());
                System.out.println("Report opened in system browser: " + reportPath);
            } else {
                System.out.println("Report file does not exist: " + reportPath);
            }
        } catch (IOException e) {
            System.out.println("Error opening report: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void endTest() {
        if (extent != null) {
            extent.flush();
        }
    }
}