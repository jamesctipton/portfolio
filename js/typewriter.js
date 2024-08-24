import { finishTyping } from "./index.js";

export default class Typewriter {

    constructor(doc, self) {
        this.typeDelay = [10, 10, 15, 15, 15, 20, 20, 20, 20, 50]; // array of possible typing delays 
        // this.typeDelay = 0;
        this.tempTypeDelay = 0; // will change based on text
        this.doc = doc;         // the html Document object
        this.self = self;       // the typewriter <pre> element
        this.skipped = false    // boolean for if animation is skipped
    }

    isWhiteSpace(ch) {
        return ((ch == ' ') || (ch == '\t') || (ch == '\n'));
    }

    // select a random element from a given array
    randomChoice(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }

    // chunk of characters to be appended to the page's HTML
    textChunk = "";
    // between an opening (<div>) and closing (</div>) of a tag
    htmlTagOpen = false;
    // currently writing the tag (<div class="example">)
    currentlyWritingTag = false;

    // generator to type one character of webpage
    // this function scans through the innerHTML of the typewriter <pre>, creates new html tags dynamically and emulates typing them out.
    *typeChar(text) {
        for(let i=0; i < text.length - 1; i++) {

            if(this.currentlyWritingTag) {
                this.textChunk += text[i];
            }
            // if the text gets to the opening of a new tag
            if(text[i] === "<") {
                this.tempTypeDelay = 0;
                if(this.htmlTagOpen) {
                    this.htmlTagOpen = false;
                    this.currentlyWritingTag = true;
                } else {
                    this.textChunk = "";
                    this.htmlTagOpen = true;
                    this.currentlyWritingTag = true;
                    this.textChunk += text[i];
                }
            }

            // without this clause, all the innerHTML of tags isn't added. Only the literals that are typed on the .html file are
            if(!this.currentlyWritingTag && this.htmlTagOpen) {
                this.textChunk.innerHTML += text[i];
            }

            // this clause just determines the speed at which characters are typed, and adds text to the typewriter <pre>
            if(!this.currentlyWritingTag && !this.htmlTagOpen) {
                if(this.isWhiteSpace(text[i])) {
                    this.tempTypeDelay = 0;
                } else {
                    // change typing speed semi randomly to emulate human typing speed
                    this.tempTypeDelay = this.randomChoice(this.typeDelay);
                }

                this.self.innerHTML += text[i];
            }

            // this clause controls what happens when the end of a tag is reached. It will then add a new span element to the DOM
            if(this.currentlyWritingTag && text[i] === ">") {
                this.tempTypeDelay = this.randomChoice(this.typeDelay);
                this.currentlyWritingTag = false;

                if(this.htmlTagOpen) {
                    let newSpan = this.doc.createElement("span");
                    this.self.appendChild(newSpan);
                    newSpan.innerHTML = this.textChunk;
                    this.textChunk = newSpan.firstChild;
                }
            }

            // the yield variable is arbitrary, but the yield is required to control the speed at which the typeChar() generator is called.
            yield text[i];
        }
    }

    // function to call typeChar every typeDelay interval of time
    typePage() {
        
        const typingGenerator = this.typeChar(this.self.innerHTML);

        // preserve innerHTML in case animation is skipped
        let preserve = this.self.innerHTML;
        // delete current html so its not rendered.
        this.self.innerHTML = "";
        var genVal = undefined;

        // create an Observer instance
        const resizeObserver = new ResizeObserver(e => 
            // auto scroll animation
            this.doc.getElementById("typewriter").scrollIntoView({ behavior: "instant", block: "end" })
        );
        
        // start observing size changes of body DOM node
        resizeObserver.observe(document.body);
        
        // skip typing animation on first time pressing enter
        let x = this;
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                x.self.innerHTML = preserve;
                x.skipped = true;
            }
        }, { once: true });

        const recursiveType = () => {

            genVal = typingGenerator.next();

            if (!genVal.done && !this.skipped) {
                setTimeout(recursiveType, this.tempTypeDelay);
            }
            else {
                // generator finishes
                // stop ResizeObserver so changing the size of the body element doesn't autoscroll
                resizeObserver.disconnect();
                // call index.js function to render info divs and enable pointer events
                finishTyping();
            }
        };

        recursiveType();
    }

}