(function () {
  var T = ["Have any of your closest relationships been trouble by a lot of arguments or repeated breakups?","Have you deliberately hurt yourself physically (e.g. punched yourself, cut yourself, burned yourself)? How about made a suicide attempt?","Have you had at least two other problems with impulsivity (e.g. eating binges and spending sprees, drinking too much and verbal outbursts)?","Have you been extremely moody?","Have you felt very angry a lot of the time? How about often acted in an angry or sarcastic manner?","Have you often been distrustful of other people?","Have you frequently felt unreal or as if things around you were unreal?","Have you chronically felt empty?","Have you often felt that you had no idea of who you are or that you have no identity?","Have you made desperate efforts to avoid feeling abandoned or being abandoned (e.g., repeatedly called someone to reassure yourself that he or she still cared, begged them not to leave you, clung to them physically)?","Have you ever been diagnosed with Bipolar I (with mania), Schizoaffective disorder, or Schizophrenia?","In the past month, have you used marijuana, alcohol, or other drugs excessively, to the point that it caused problems or you tried to stop (don't include nicotine)?"];
  var YN = [{ v: 1, l: "Yes", show: false }, { v: 0, l: "No", show: false }];
  window.CFG = {
    slug: "msi", short: "MSI-BPD", sub: "McLean Screening Instrument for Borderline Personality Disorder",
    sections: [{ id: "s1", title: "Yes or No", items: T.map(function (t, i) { return { id: "q" + (i + 1), num: (i + 1) + ".", text: t, opts: YN }; }) }],
    scoringHint: '<p class="hint">CUT-OFF: YES TO AT LEAST 7 OF THE FIRST 10 ITEMS, AND NO TO THE LAST 2 ITEMS. Sensitivity 0.81, specificity 0.85; Zanarini et al, J Personality Dis 2003, 17(6).</p>',
    footer: "MSI-BPD · Zanarini et al 2003 · screening only, not diagnostic",
    score: function (A, H) {
      var f = H.ids("q", 1, 10), yes = H.count(A, f, function (v) { return v === 1; }), miss = H.missing(A, f).length;
      var lastNo = A.q11 === 0 && A.q12 === 0, lastBlank = A.q11 === null || A.q12 === null, lastYes = A.q11 === 1 || A.q12 === 1;
      var res, inc = false;
      if (yes >= 7 && lastNo) res = "POSITIVE screen (7+ of first 10 Yes, No to last 2)";
      else if (lastYes || yes + miss < 7) res = "Negative screen" + (lastYes ? " (Yes to item 11 or 12, cut-off requires No to both)" : "");
      else { res = "Incomplete, not scored (blank answers could change the result)"; inc = true; }
      var flags = []; if (A.q2 === 1) flags.push("Item 2 Yes: self-harm or suicide attempt history. Review safety.");
      return { incomplete: inc, flags: flags, rows: [["Yes count, items 1-10", yes + (miss ? " (" + miss + " blank)" : "")], ["Item 11", A.q11 === null ? "blank" : (A.q11 ? "Yes" : "No")], ["Item 12", A.q12 === null ? "blank" : (A.q12 ? "Yes" : "No")], ["Result", res]] };
    }
  };
})();
