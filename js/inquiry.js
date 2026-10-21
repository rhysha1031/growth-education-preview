/*
  チェックした項目を、問い合わせメールの本文へ引き継ぐ。
  ------------------------------------------------------------------
  対象は data-inquiry-send を持つリンク。
    data-inquiry-source : チェックボックスを含む要素のセレクタ
    data-inquiry-label  : 本文に入る見出し行
  ひとつも選ばれていない場合は何もせず、リンク本来の href へ進む
  (JavaScript が動かない環境でも同じ)。送信はせず、利用者自身の
  メールソフトを開くだけ。
*/
(function () {
  var MAIL = 'growtheducation1007@gmail.com';
  var SUBJECT = 'お問い合わせ（Growth Education サイトより）';

  var links = document.querySelectorAll('[data-inquiry-send]');
  Array.prototype.forEach.call(links, function (link) {
    link.addEventListener('click', function (e) {
      var scope = document.querySelector(link.getAttribute('data-inquiry-source'));
      if (!scope) return;

      var checked = Array.prototype.map.call(
        scope.querySelectorAll('input[type="checkbox"]:checked'),
        function (el) { return '・' + el.value; }
      );
      if (!checked.length) return;

      e.preventDefault();
      var body = 'お名前：\nご連絡先：\n\n'
        + link.getAttribute('data-inquiry-label') + '\n'
        + checked.join('\n')
        + '\n\nそのほかお伝えしたいこと：\n';

      window.location.href = 'mailto:' + MAIL
        + '?subject=' + encodeURIComponent(SUBJECT)
        + '&body=' + encodeURIComponent(body);
    });
  });
})();
