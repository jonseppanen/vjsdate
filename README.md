# vjsdate

#### _vanilla javascript date_

##### aka: why do I need to use jquery and jquery UI for a decent date/time picker?

Vanilla Javascript Date is a simple, native, fast, small piece of javascript code you can use however and wherever you want.

It's small, requires nothing (or you can put ketchup on it if you want, I don't care), doesn't interfere with anything, and you can easily customize it. It should work on everything but IE.

[The example can be viewed on codepen here](https://codepen.io/jonseppanen/pen/mmgErP)

## Usage

First step is to make sure the input you want to assign as a vjsdate input has a valid date/time format. Once done:

**Required:** This is the thing that 'turns on' the plugin
```
data-vjsdate
```

**Optional:** This sets up the format you want the output to be in. Incidently, this example is the default output format. Change it to any compatiable 'toLocaleDateString' format.
```
data-vjsdateFormat='{ "weekday": "long", "year": "numeric","month": "long","day": "numeric","hour": "numeric", "minute": "numeric"}
```

**Optional:** The start of the date range allowed. If not used, it defaults to the original value ever presented.
```
data-vjsdateStart="Aug 17 2017 10:30:00"
```

**Optional:** The end date. If not set, will be 2 years after the original date.
```
data-vjsdateEnd="Aug 25 2021 20:00:00"
```

To use it, copy the vjsdate.js code into your JS somewhere (or make it a mini framework with ketchup, I don't care)

I have put some basic styling to get you going in the vjsdate.css file. Ideally you would do a better job or expand on the default. It's a bit moderial.

Hopefully this will get us by until the browsers can get the native one up to scratch.
