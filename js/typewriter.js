export default class Typewriter {

    constructor(doc, self) {
        this.typeDelay = 100;   // constant value
        this.tempTypeDelay = 0; // will change based on text
        this.doc = doc;         // the html Document object
        this.self = self;       // the typewriter <pre> element

        this.intervalID = 0;
    }

    isWhiteSpace(ch) {
        return ((ch == ' ') || (ch == '\t') || (ch == '\n'));
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
                    this.tempTypeDelay = Math.random() * this.typeDelay;
                }

                this.self.innerHTML += text[i];
            }

            // this clause controls what happens when the end of a tag is reached. It will then add a new span element to the DOM
            if(this.currentlyWritingTag && text[i] === ">") {
                this.tempTypeDelay = Math.random() * this.typeDelay;
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

        // delete current html so its not rendered.
        this.self.innerHTML = "";
        
        const recursiveType = () => {
            typingGenerator.next();

            if (!typingGenerator.done) {
                setTimeout(recursiveType, this.tempTypeDelay);
            }
        };

        recursiveType();
    }

}