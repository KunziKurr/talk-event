# HEADER BAR

SASS is a is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.
This projects compiles `SCSS` files into one `CSS` file.
## Features
    Well layed down folder structure and Standard CSS media queries converted to Mixins
    Compressed CSS file
    Autoprefixing for cross-browser compatibility.
## CSS MEDIA QUERY REFERENCE
     0-575px : PHONE
    576-992px: Tablet Portrait
    993-1200px: Tablet Landscape
    {1200-1440px} is our normal styls application
    1441px + : Big Desktop

## MIXINS USAGE
    body {
        @include respond-below(xs) {
            background-color: gray;
        }

        @include respond-between(xs, sm ) {
            background-color: blue;
        }   
        @include respond-between(sm,md) {
            background-color: yellow;
        }

        @include respond-between(md,lg ) {
            background-color: purple;
        }
        @include respond-above(lg) {
            background-color: black;
        }
}
## Installation
    git clone https://github.com/KunziKurr/sass-boiler-plate.git
    Clone the repository to get the basic folder structure
 
       
## Usage
1. After cloning, paste the `sass` to your project folder.
2. Copy the packages from the package json.
    ## Packages used
        "autoprefixer"
        "browserslist"
        "clean-css-cli"
        "node-sass"
        "postcss"
        "postcss-cli"
3. Run the `yarn build`to perform the compilation of scss files to one CSS file. Output files will be located at `build` folder

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)