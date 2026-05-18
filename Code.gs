/**
 * BrickDuck 신청 폼 → Google Sheets 연동 스크립트 (v2)
 *
 * 이 코드는 일반 HTML form POST(application/x-www-form-urlencoded)를 받아 처리합니다.
 * Apps Script 편집기에 붙여넣고 "배포 → 배포 관리 → 편집 → 새 버전 → 배포"로 갱신하세요.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // 시트가 비어있으면 헤더 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수 시각",
        "이름",
        "연락처",
        "우편번호",
        "주소",
        "상세주소",
        "옵션"
      ]);
    }

    const p = e.parameter || {};

    sheet.appendRow([
      p.timestamp ? new Date(p.timestamp) : new Date(),
      p.name || "",
      p.phone || "",
      p.zipcode || "",
      p.address || "",
      p.addressDetail || "",
      p.option || ""
    ]);

    return ContentService
      .createTextOutput("ok")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("error: " + err)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// 브라우저에서 URL 직접 열었을 때 확인용
function doGet() {
  return ContentService.createTextOutput("BrickDuck endpoint is alive.");
}
