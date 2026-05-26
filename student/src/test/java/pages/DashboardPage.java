package pages;

import com.microsoft.playwright.Page;
import static org.testng.Assert.*;

public class DashboardPage {

    private Page page;

    public DashboardPage(Page page) {
        this.page = page;
    }

    String title = "//h2";
    String nameBox = "//input[contains(@id,'name')]";
    String percentBox = "//input[contains(@id,'percent')]";
    String addBtn = "//button";

    String tableName = "//table/tbody/tr[2]/td[1]";
    String tablePercent = "//table/tbody/tr[2]/td[2]";

    public void verifyDashboard() {
        assertTrue(page.url().contains("dashboard"));
        assertEquals(page.locator(title).textContent(), "Student Dashboard");
    }

    public void addStudent(String name, String percent) {
        page.locator(nameBox).fill(name);
        page.locator(percentBox).fill(percent);
        page.locator(addBtn).click();
    }

    public void verifyStudent(String expectedName, String expectedPercent) {
        assertEquals(page.locator(tableName).textContent(), expectedName);
        assertEquals(page.locator(tablePercent).textContent(), expectedPercent);
    }
}