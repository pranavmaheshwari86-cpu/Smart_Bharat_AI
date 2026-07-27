import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3000")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Start conversation' link to open the AI Policy Assistant interface.
        # Start conversation arrow_forward link
        elem = page.locator("xpath=/html/body/main/main/section[3]/div[2]/div[3]/a").nth(0)
        await elem.click(timeout=10000)
        
        # -> Click the 'Send' button to submit the prompt and observe whether the assistant returns an immediate/streaming response.
        # send button
        elem = page.get_by_role('button', name='send', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        # check current URL to ensure we're on the Assistant page
        current_url = await page.evaluate("() => window.location.href")
        # Assert: URL navigates to /ai after opening the Assistant
        assert "/ai" in current_url, "The page should be at /ai"
        
        elem = page.locator('xpath=/html/body/main/div/div[4]/main/div[2]/div/form/input').nth(0)
        await elem.scroll_into_view_if_needed()
        # Assert: Message input field is visible in the assistant page
        assert await elem.is_visible(), "Expected element to be visible after scrolling into view"
        placeholder = await page.locator('xpath=/html/body/main/div/div[4]/main/div[2]/div/form/input').nth(0).get_attribute('placeholder')
        # Assert: Message input field has placeholder text 'Ask about schemes, upload documents, or request guidance...'
        assert placeholder == 'Ask about schemes, upload documents, or request guidance...', "The input placeholder should match the expected guidance text"
        
        suggested = page.locator('text=Explain In One Sentence How').nth(0)
        await suggested.scroll_into_view_if_needed()
        # Assert: Suggested prompt 'Explain In One Sentence How' is visible in the UI
        assert await suggested.is_visible(), "Expected suggested prompt to be visible after scrolling into view"
        
        send_btn = page.locator('xpath=/html/body/main/div/div[4]/main/div[2]/div/form/div/button[3]').nth(0)
        await send_btn.scroll_into_view_if_needed()
        # Assert: Send button is visible so the user can submit prompts
        assert await send_btn.is_visible(), "Expected send button to be visible after scrolling into view"
        
        assistant_msg_locator = page.locator("text=**Government Policy Impact**: Government policies significantly affect various aspects of citizens' lives, including **economic growth**, **social welfare**, and **infrastructure development**, by influencing the allocation of resources, regulation of industries, and provision of public services.").nth(0)
        await assistant_msg_locator.scroll_into_view_if_needed()
        assistant_text = await assistant_msg_locator.text_content()
        # Assert: Assistant response contains the expected policy explanation about government policy impact
        assert "Government policies significantly affect various aspects of citizens' lives, including **economic growth**, **social welfare**, and **infrastructure development**, by influencing the allocation of resources, regulation of industries, and provision of public services." in assistant_text, "The assistant response should describe the impact of government policy as observed"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    