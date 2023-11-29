## All in one - Shopify Monitor

## Installation & Usage

> 
> 1. First, you must install NodeJS, which can be installed here (pick LTS):
>> https://nodejs.org/en/download/
>
> 2. Download folder from the drive link.
>
> 4. After it has completed you must type this:
>> `cd shopify-monitor-enterprise`
>
> 5. Now you can open up the file explorer using the command `explorer` on Windows and `open .` on a Mac *(don't forget the `.` after open)*.
> 6. Now navigate to the user folder.
> 7. Now you must navigate to the config folder and add proxies into the *proxies.txt* file, edit the Discord webhook URL inside of *webhooks.txt*, add your sites in *sites.txt* (if you want to filter the results, please filter on the website itself and add the filtered link) (no commas between websites, just enter and add), and finally edit your delay in *config.json* (1s=1000, 30s-30000 by default). You can edit this with any text editor.
> 8. Now that everything is set up go back to your command prompt/terminal and type this:
>> `npm install`
>
> 9. Now, wait for it to install completely.
> 10. Now you can type this command:
>> `npm start`
>