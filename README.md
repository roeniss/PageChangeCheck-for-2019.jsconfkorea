# Script for check changes in 2019 JSconf Korea webpage

[ [Korean](https://github.com/roeniss/check_if_something_changed_in_2019.jsconfkorea/blob/master/README-ko.md) | [English](https://github.com/roeniss/check_if_something_changed_in_2019.jsconfkorea/blob/master/README.md) ]

## 1. Overview

This script will check if there is change or not in [2019 JSconf Korea webpage](https://2019.jsconfkorea.com/).

(So far, the tickets for the conference are not on sale.)

When the script returns `True` -- that means there's change and it means the tickets are in sale -- it will automatically call `mailToMe.js` which will send email to where you writed in `.env`. **HEY! CHECK THE SITE!!**

## 2. Goal

To get a ticket for 2019 JSConf Korea. Of course the logic itself is applicable to other websites if you correctly customize... \*merciful smile\*

## 3. Real mechanism

With `index.js`, write whole html contents (in the first section) to `note.txt`. Next time `index.js` would check if there is difference between contents of `note.txt` and contents of newly investigated webpages.

## 4. Structure

`.env`: You should write 4 environment variables. GID and GPW is your email account. It would be used for sending email.

`index.js`: It will investigate [the webpage](https://2019.jsconfkorea.com/). Actually it just investigate only the first section. I am definitely sure that would be enough.

`mailToMe.js`: If some changes found, which means probably tickets are in sale or at least there's some updates, this script will send email to `TO`. `TO` is written in `.env`.

`note.txt`: This is the hack point. write the contents investigated.

`package.json`, `package-lock.json`: This script needs 4 library.

- `cheerio`: Alternatives to jquery for catching html contents
- `dotenv`: For using the environment variables.
- `emailjs`: Simple STMP module for sending emails.
- `request`: HTTP client for investigating the webpage.

## 5. How to use

I have a little AWS ec2 server so I registered this script to crontab list as below.

```bash
$ sudo crontab -e

...
*/5 * * * * cd /path/where/script/existed && sudo node ./index.js >> ./crontab.log 2>&1
...
```

This is not official and also not efficient way. Nevertheless, this will be very helpful.
