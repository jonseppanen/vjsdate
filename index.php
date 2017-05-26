<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <title>vjsdate</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="vjsdate.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">

</head>

<body class="row">
  <article>
    <section>
      <h1>vjsdate</h1>
      <h4><i>vanilla javascript date</i></h4>
      <h5>aka: why do I need to use jquery and jquery UI for a decent date/time picker?</h5>
    </section>
    <section>
      <p>Vanilla Javascript Date is a simple, native, fast, small piece of javascript code you can use however and wherever you want.</p>
      <p>It's small, requires nothing (or you can put ketchup on it if you want, I don't care), doesn't interfere with anything, and you can easily customize it. It should work on everything but IE.</p>

      <p>As a demo, clicking the input field (or giving focus) will open the modal.</p>
      <input class="demo" value="Aug 25 2017 10:31:00" data-vjsdate data-vjsdateFormat='{ "weekday": "long", "year": "numeric","month": "long","day": "numeric","hour": "numeric", "minute": "numeric"}' data-vjsdateStart="Aug 15 2017 10:30:00"  data-vjsdateEnd="Aug 25 2021 20:00:00">
    </section>
    <section>
      <h2>Usage</h2>

      <p>This is the code for the above example:</p>
      <pre><code><?php echo htmlspecialchars('<input class="demo" value="Aug 25 2017 10:31:00" data-vjsdate data-vjsdateFormat=\'{ "weekday": "long", "year": "numeric","month": "long","day": "numeric","hour": "numeric", "minute": "numeric"}\' data-vjsdateStart="Aug 17 2017 10:30:00"  data-vjsdateEnd="Aug 25 2021 20:00:00">');?> </code></pre>
      <p>The relevant parts to use it are as follows:</p>
      <br>
      <pre><code><?php echo htmlspecialchars('value="Aug 25 2017 10:31:00"')?> </code></pre>
      <p>In the above attribute, we are simply assigning any readable date value. You have probably already got this done. </p>
       <br>
      <pre><code><?php echo htmlspecialchars('data-vjsdate')?> </code></pre>
      <p>This is the thing that 'turns on' the plugin </p>
       <br>
      <pre><code><?php echo htmlspecialchars('data-vjsdateFormat=\'{ "weekday": "long", "year": "numeric","month": "long","day": "numeric","hour": "numeric", "minute": "numeric"}\'')?> </code></pre>
      <p><b>Optional:</b> This sets up the format you want the output to be in. Incidently, the above example is the default output format. Change it to any compatiable 'toLocaleDateString' format.</p>
       <br>
      <pre><code><?php echo htmlspecialchars('data-vjsdateStart="Aug 17 2017 10:30:00"')?> </code></pre>
      <p><b>Optional:</b> The start of the date range allowed. If not used, it defaults to the original value ever presented. </p>
       <br>
      <pre><code><?php echo htmlspecialchars('data-vjsdateEnd="Aug 25 2021 20:00:00">')?> </code></pre>
      <p><b>Optional:</b> The end date. If not set, will be 2 years after the original date. </p>

      <p>To use it, put the below code in your JS somewhere (or make it a mini framework with ketchup, I don't care)</p>
      <pre><code><?php $vjscode = file_get_contents('vjsdate.js');echo htmlspecialchars($vjscode); ?></code></pre>
      <p>I have put some basic styling to get you going in the vjsdate.css file. Ideally you would do a better job or expand on the default. It's a bit moderial.</p>
      <p>Hopefully this will get us by until the browsers can get the native one up to scratch.</p>
    </section>
  </article>
  <script src="vjsdate.js" type="text/javascript"></script>
</body>

</html>