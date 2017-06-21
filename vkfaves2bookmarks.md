# Built-in VK faves converter

## Info

This manual will help you to import you VK faves(aka vk bookmarks) to browser bookmarks sorted by group/user id

## Parse VK faves links

* go to [https://vk.com/fave](https://vk.com/fave)
* press `end` button on your keyboard as much as you want/can
* go to your browser's console (e.g. in Chrome - press `F12`)
* inject jquery
    * e.g. `var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);`
* use this code to COPY all bookmarks links to your clipboard

```
var links = '';
$('.post_link').each(function() {
    links += 'https://vk.com' + $(this).attr('href') + '\n';
});
copy(links);
```

## Create bookmarks.html

* paste copied links in `links.txt`
* run `npm run vk`
* import created file from `/output/` folder to your browser