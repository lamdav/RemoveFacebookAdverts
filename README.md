# Remove Facebook Adverts

## Motivation
If you are like me, you have or had used your email to contact temporary housing listings on craigslist or online advertisement
as you are trying to find housing. Now, advertisers are using ads that are targeted towards you because they uploaded
a contact list. These advertisers contains realtor, car dealers, etc. from all over. This includes places you 
have never been to. I just wanted to have a clean Facebook experience (as much as they would allow me to at least).

## Inspirations
I was inspired by this neat little [gist](https://gist.github.com/scarlac/3c4b9d9868148ef31e2ea5082e59a0f1).
I built off of this since I did not want to copy and paste this script into my console
everytime I remember to clean out my advertisement preference. Since I already have Tampermonkey
installed, I decided to modify it so it can work more autonomously. 

## What it does?
Install it via Tampermonkey (should work on GreaseMonkey as well but I have not tested it).
This will run when you are on Facebook's homepage or ad preference view. If you are on
the homepage, it will attempt to insert a quick link "Manage Ad Preference" under the
post creation text field. This is primary for convenience as it not only saves a couple of clicks
through Facebook's maze of a settings page but also acts as a reminder to clean
up this growing list of random advertisers you may have interacted with. 

Once on the ad preference view, it will attempt to open the interacted panel and
try to show all advertisers you have interacted with. Once done, it will then remove them all.
