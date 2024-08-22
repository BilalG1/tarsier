from playwright.async_api import async_playwright
from settings import settings, google_cloud_credentials
from tarsier import Tarsier, GoogleVisionOCRService
import base64


ocr_service = GoogleVisionOCRService(google_cloud_credentials)
tarsier = Tarsier(ocr_service)


async def url_to_page_text(url: str, screenshot_page: bool = False):
    async with async_playwright() as playwright:
        chromium = playwright.chromium
        browser = await chromium.connect_over_cdp('wss://connect.browserbase.com?apiKey='+ settings.deworkd_browserbase_api_key)
        context = browser.contexts[0]
        page = context.pages[0]
        await page.goto(url)
        page_text, tag_to_xpath = await tarsier.page_to_text(page, tagless=True)
        if screenshot_page:
            screenshot_bytes = await page.screenshot(full_page=True)
            img_b64 = base64.b64encode(screenshot_bytes).decode()
            return page_text, img_b64
        return page_text, None
