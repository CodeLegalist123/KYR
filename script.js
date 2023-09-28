const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const cardContainer = document.getElementById("cardContainer");

let currentQuestion = 0;
const questions = [
    "1-regarding what you are facing issues",
    "2-what type of solution you are looking for",
    "3-its related to which department like health, finance, and all"
];
let userResponses = [];
let searchTheseKeys = new Set();

function askQuestion() {
    chatMessages.innerHTML += `<div class="bot-message">${questions[currentQuestion]}</div>`;
}

function processUserInput() {
    const answer = userInput.value.trim();
    if (answer !== "") {
        userResponses.push(answer);
        extractKeywords(answer);
        currentQuestion++;

        if (currentQuestion < questions.length) {
            askQuestion();
        } else {
            // Filter the JSON data based on keywords and display cards
            const filteredData = filterDataByKeywords(data, searchTheseKeys);
            if (filteredData.length > 0) {
                displayCards(filteredData);
            } else {
                chatMessages.innerHTML += `<div class="bot-message">No matching cards found.</div>`;
            }
        }

        userInput.value = "";
    }
}

function extractKeywords(answer) {
    // Tokenize the answer and extract unique keywords
    const words = answer.toLowerCase().split(/\s+/);
    words.forEach(word => {
        // Filter out common words (stop words)
        if (!isCommonWord(word)) {
            searchTheseKeys.add(word);
        }
    });
}

function isCommonWord(word) {
    const commonWords = ["a", "an", "the", "in", "on", "at", "to", "for", "with", "by", "and", "but", "or", "of", "is", "was", "were"];
    return commonWords.includes(word);
}

function filterDataByKeywords(data, keywords) {
    return data.filter(item => {
        if (item.keywords && Array.isArray(item.keywords)) {
            // Check if any keyword in the item matches the user's keywords
            return item.keywords.some(keyword => keywords.has(keyword.toLowerCase()));
        }
        return false;
    });
}

function displayCards(filteredData) {
    cardContainer.innerHTML = ""; // Clear previous cards

    filteredData.forEach(function (item) {
        const card = document.createElement('div');
        card.className = 'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';
        card.innerHTML = `
            <a href="#">
                <img class="rounded-t-lg" src="${item.image}" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.title}</h5>
                </a>
                <a href="${item.link}" class="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

submitButton.addEventListener("click", processUserInput);

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        processUserInput();
    }
});

// Sample JSON data (replace with your actual JSON data)
const data = [
    {
        "id": "1",
        "title": [
            "Section 120A"
        ],
        "description": [
            "When two or more persons agree to do, or cause to be done: (i)an illegal act, or (ii)an act which is not illegal by illegal means,such an agreement is designated a criminal conspricy; Provided that no agreement except an agreement to commit an offence shall amoutn to a criminal conspiracy unless some act besides the agreement is done by one or more parties to such agreement in pursuance thereof."
        ],
        "keywords":[
            "criminal conspiracy","section 120A"
            
        ],
        "link": "/pages/pg1.html",
        "image":"./images/1.jpg"
    },
    
    {
        "id": "2",
        "title": [
            "Section 465"
        ],
        "description": [            
            "Whoever commits forgery shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.\\n\\Offence:forgery, Punishment: 2years or fine or both, Non-cognizable, Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
            "forgery","section 465","falsification"
        ],
        "image":"./images/2.jpeg",
        "link": "/pages/pg2.html"
    },
    {
        "id": "3",
        "title": [
            "Section 463"
        ],
        "description": [            
            "Whoever makes any false document or false electronic record or part of a document or electronic record, with intent to cause damage or injury], to the public or to any person, or to support any claim or title, or to cause any person to part with property, or to enter into any express or implied contract, or with intent to commit fraud or that fraud may be committed, commits forgery. \\n\\ Whoever commits forgery, intending that the document or electronic record forged shall harm the reputation of any party, or knowing that it is likely to be used for that purpose, shall be punished with imprisonment of either description for a term which may extend to three years, and shall also be liable to fine."
        ],
        "keywords":[
            "forgery","section 463"
        ],
        "image":"./images/3.jpeg",
        "link": "/pages/pg3.html"
    },
    {
        "id": "4",
        "title": [
            "Section 464"
        ],
        "description": [            
            "The making of a false document in the name of a fictious person, intending it to be believed that the document was made by a real person, or in the name of a deceased person, intending it to be believed that the document was made by the person in his lifetime, may amount to forgery.\\n\\It states that the person who committed forgery is punished, under this Section. And, the punishment for the convict of forgery is imprisonment for a maximum period of two years, a fine, or both."
        ],
        "keywords":[
            "forgery","section 464"
        ],
        "image":"./images/4.jpeg",
        "link": "/pages/pg4.html"
    },
    {
        "id": "5",
        "title": [
            "Section 493"
        ],
        "description": [            
            "A man by deceit causing a woman not lawfully married to him to believe that she is lawfully married to him and to cohabit with him in that belief.\\n\\Punishment:10years + fine, Non-cognizable, Non-Bailable, Triable by Magistrate First Class"
        ],
        "keywords":[
            "offence","marriage offence"
        ],
        "image":"./images/5.jpeg",
        "link": "/pages/pg5.html"
    },
    {
        "id": "6",
        "title": [
            "Section 494"
        ],
        "description": [            
            "Whoever, having a husband or wife living, marries in any case in which such marriage is void by reason of its taking place during the life of such husband or wife, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\\n\\ Offence:Marrying again during the life-time of a husband or wife, Punishment:7years + fine, Non-Cognizable, Triable by Magistrate First Class"
        ],
        "keywords":[
            "marriage offence","section 494"
        ],
        "image":"./images/6.jpeg",
        "link": "/pages/pg6.html"
    },
    {
        "id": "7",
        "title": [
            "Section 495"
        ],
        "description": [            
            "Whoever commits the offence defined in the last preceding section having concealed from the person with whom the subsequent marriage is contracted, the fact of the former marriage, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.\\n\\ Offence: Same offence with concealment of the former marriage from the person with whom subsequent marriage is contracted, Punishment: 10years + Fine, Non-Cognizable, Bailable, Triable by Magistrate First class"
        ],
        "keywords":[
            "marriage offence","section 495"
        ],
        "image":"./images/7.jpeg",
        "link": "/pages/pg7.html"
    },
    {
        "id": "8",
        "title": [
            "Section 496"
        ],
        "description": [            
            "Whoever, dishonestly or with a fraudulent intention, goes through the ceremony of being married, knowing that he is not thereby lawfully married, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\\n\\Offence: A person with fraudulent intention going through the ceremony of being married knowing that he is not thereby lawfully married, Punishment: 7years + Fine, Non-Cognizable, Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
            "marriage offence","section 496"
        ],
        "image":"./images/8.jpeg",
        "link": "/pages/pg8.html"
    },
    {
        "id": "9",
        "title": [
            "Section 497"
        ],
        "description": [            
            "Whoever has sexual intercourse with a person who is and whom he knows or has reason to believe to be the wife of another man, without the consent or connivance of that man, such sexual intercourse not amounting to the offence of rape, is guilty of the offence of adultery, and shall be punished with imprisonment of either description for a term which may extend to five years, or with fine, or with both. In such case the wife shall not be punishable as an abettor.\\n\\ Offence: Adultery, Punishment: 5years or fine or both, Non-Cognizable, Bailable, Traiable by Magistrate First Class."
        ],
        "keywords":[
            "marriage offence","adultery","section 497"
        ],
        "image":"./images/9.jpeg",
        "link": "/pages/pg9.html"
    },
    {
        "id": "10",
        "title": [
            "Section 498"
        ],
        "description": [            
            "Whoever takes or entices away any woman who is and whom he knows or has reason to believe to be the wife of any other man, from that man, or from any person having the care of her on behalf of that man, with intent that she may have illicit intercourse with any person, or conceals or detains with that intent any such woman, shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.\\n\\ Offence: Enticing or taking away or detaining with a criminal intent a married woman, Punishment: 2years and Fine, Non-Cognizable, Bailable, Triable by Any Magistrate."
        ],
        "keywords":[
            "marriage offence","section 498"
        ],
        "image":"./images/10.jpeg",
        "link": "/pages/pg10.html"
    },
    {
        "id": "11",
        "title": [
            "Section 498a"
        ],
        "description": [            
            "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine.\\n\\ Offence: (i)Punishment for subjecting a married woman to Cruelty, Punishment: 3years + Fine, Non-Cognizable, Non-Bailable, Triable by Magistrate First Class (ii)If information of offence is given to SHO by aggrieved or her relative by blood, marriage or adoption, or by notified public servant, Punishment: 3years + Fine, Cognizable, Non-Bailable, Triable by Magistrate First Class"
        ],
        "keywords":[
            "marriage offence","section 498a"
        ],
        "image":"./images/11.jpeg",
        "link": "/pages/pg11.html"
    },
    {
        "id": "12",
        "title": [
            "Section 415"
        ],
        "description": [            
            "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to cheat."
        ],
        "keywords":[
            "cheating","section 415"
        ],
        "image":"./images/12.jpeg",
        "link": "/pages/pg12.html"
    },
    {
        "id": "13",
        "title": [
            "Section 416"
        ],
        "description": [         
            "cheat by personation : A person is said to cheat by personation if he cheats by pretending to be some other person, or by knowingly substituting one person for or another, or representing that he or any other person is a person other than he or such other person really is."
        ],
        "keywords":[
            "cheating", "section 416"
        ],
        "image":"./images/13.jpeg",
        "link": "/pages/pg13.html"
    },
    {
        "id": "14",
        "title": [
            "Section 417"
        ],
        "description": [         
            "punishment for cheating : Whoever cheats shall be punished with imprisonment of either description for a term which may extend to one year, or with fine, or with both.\\n\\ Offence: Cheating, Punishment: 1year or Fine or Both, Non-cognizable, Bailable, Triable by Any Magistrate"
        ],
        "keywords":[
            "cheating","punishment for cheating"
        ]
        ,
        "image":"./images/14.jpeg",
        "link": "/pages/pg14.html"
    },
    {
        "id": "15",
        "title": [
            "Section 418"
        ],
        "description": [         
            "Whoever cheats with the knowledge that he is likely thereby to cause wrongful loss to a person whose interest in the transaction to which the cheating relates, he was bound either by law, or by legal contract, to protect, shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.\\n\\ Offence: Cheating a person whose interest the offender was bound, either by law or by legal contract, to protect, Punishment: 3years or Fine or Both, Non-Cognizable, Bailable, Triable by Any Magistrate."
        ],
        "keywords":[
            "cheating","section 418","cheating with knowledge"
        ],
        "image":"./images/15.jpeg",
        "link": "/pages/pg15.html"
    },
    {
        "id": "16",
        "title": [
            "Section 419"
        ],
        "description": [         
            "Punishment for cheating by personation:Whoever cheats by personation shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.\\n\\Offence: Cheating by personation, Punishment: 3years or Fine or Both, Cognizable, Bailable, Any Magistrate. "
        ],
        "keywords":[
            "cheating","punishment for cheating","section 419"
        ],
        "image":"./images/16.jpeg",
        "link": "/pages/pg16.html"
    },
    {
        "id": "17",
        "title": [
            "Section 420"
        ],
        "description": [         
            "Cheating and dishonestly inducing delivery of property:Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\\n\\ Offence: Cheating and there by dishonestly inducing delivery of property, or the making, alteration or destruction of a valuable security, Punishment: 7years + Fine, Cognizable, Non-Bailable, Triable by Mangistrate First Class."
            
        ],
        "keywords":[
            "cheating","punishment for cheating","section 420"
        ],
        "image":"./images/17.jpeg",
        "link": "/pages/pg17.html"
    },
    {
        "id": "18",
        "title": [
            "Section 405"
        ],
        "description": [         
            "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes off that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, or of any legal contract, express or implied, which he has made touching the discharge of such trust, or wilfully suffers any other person so to do, commits “criminal breach of trust”."
        ],
        "keywords":[
            "criminal breach", "section 405"
        ],
        "image":"./images/18.jpeg",
        "link": "/pages/pg18.html"
    },
    {
        "id": "19",
        "title": [
            "Section 375"
        ],
        "description": [         
           "A man is said to commit RAPE if he-(a)penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person.\\n\\(b)inserts, to any extent, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of a woman or makes her to do so with him or any other person.\\n\\ (c)manipulates any part of the body of a woman so as to cause penetration into the vagina, urethra, anus or any part of body of such woman or makes her to do so with him or any other person.\\n\\(d)applies his mouth to the vagina, anus, urethra of a woman or makes her to do so with him or any other person, under the circumstances falling under any of the following seven descriptions.\\n\\(e)Against her will.\\n\\Explanations:\\n\\(1)For the purposes of this section, “vagina” shall also include labia majora.\\n\\(2)Consent means an unequivocal voluntary agreement when the woman by words, gestures or any form of verbal or non-verbal communication, communicates willingness to participate in the specific sexual act;\\n\\Provided that a woman who does not physically resist to the act of penetration shall not by the reason only of that fact, be regarded as consenting to the sexual activity.\\n\\ Expections:\\n\\(1)A medical procedure or intervention shall not constitute rape.(2)Sexual intercourse or sexual acts by a man with his own wife, the wife not being under fifteen years of age, is not rape."
        ],
        "keywords":[
            "rape","sexual offence","women sexual cases","women rape ipc","section 375"
        ],
        "image":"./images/19.jpeg",
        "link": "/pages/pg19.html"
    },
    {
        "id": "20",
        "title": [
            "Section 376"
        ],
        "description": [         
           "Punishment for rape:\\n\\(1)Whoever, except in the cases provided for in sub-section (2), commits rape, shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.\\n\\(2)Whoever, commits rape on a woman under sixteen years of age shall be punished with rigorous imprisonment for a term which shall not be less than twenty years, but which may extend to imprisonment for life, which shall mean imprisonment for the remainder of that person’s natural life, and shall also be liable to fine:\\n\\Provided that such fine shall be just and reasonable to meet the medical expenses and rehablitation of the victim:\\n\\Provided further that any fine imposed under this sub-section shall be paid to the victim.\\n\\ Offence: Rape, Punishment: Rigorous Imprisonment for 10 years to Imprisonment for Life + Fine, Cognizable, Non-Baiable, Triable by Court of Session."
        ],
        "keywords":[
            "rape","sexual offence","section 376"
        ],
        "image":"./images/20.jpeg",
        "link": "/pages/pg20.html"
    },
    {
        "id": "21",
        "title": [
            "Section 377"
        ],
        "description": [         
           "Unnatral Offences: Whoever voluntarily has carnal intercourse against the order of nature with any man, woman or animal, shall be punished with imprisonment for life, or with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.\\n\\This Section was partly struck down by Supreme Court of India on 06 Sep 2018, to the extent of decriminalizing same-sex relations between consenting adults. (Navtej Singh Johar vs. Union of India).\\n\\Offences: Unnatural Offences, Punishment: Imprisonment for Life or 10 Years + Fine, Cognizable, Non-Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
            "rape","sexual offence","section 377"
        ],
        "image":"./images/21.jpeg",
        "link": "/pages/pg21.html"
    },
    {
        "id": "22",
        "title": [
            "Section 503"
        ],
        "description": [         
           "Criminal Intimidation: Whoever threatens another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested, with intent to cause alarm to that person, or to cause that person to do any act which he is not legally bound to do, or to omit to do any act which that person is legally entitled to do, as the means of avoiding the execution of such threat, commits criminal intimidation."
        ],
        "keywords":[
           "criminal intimidation","section 503"
        ],
        "image":"./images/22.jpeg",
        "link": "/pages/pg22.html"
    },
    {
        "id": "23",
        "title": [
            "Section 506"
        ],
        "description": [         
           "Whoever commits the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both;\\n\\If threat be to cause death or grievous hurt,etc - and if the threat be to cause death or grievous hurt, or to cause the destruction of any property by fire, or to cause an offence punishable with death or imprisonment for life, of with imprisonment for a term which may extend to seven years, or to impute unchastity to a woman, shall be punished with imprisonment of either description for a term which may extend to seven years, or with fine, or with both.\\n\\ Offence: (1)Criminal, Punishment: 2years or Fine or Both, Non-Cognizable, Bailable, Triable by Any Magistrate.\\n\\(2)If threat be to cause death or grievous hurt,etc, Punishment: 7years or Fine or Both, Non-Cognizable, Bailable, Triable by Magistrate First Class"
        ],
        "keywords":[
           "criminal intimidation","punishment for criminal intimidation","section 506"
        ],
        "image":"./images/23.jpeg",
        "link": "/pages/pg23.html"
    },
    {
        "id": "24",
        "title": [
            "Section 507"
        ],
        "description": [         
           "Whoever commits the offence of criminal intimidation by an anonymous communication, or having taken precaution to conceal the name or abode of the person from whom the threat comes, shall be punished with imprisonment of either description for a term which may extend to two years,in addition to the punishment provided for the offence by the last preceding section.\\n\\Offence: Criminal intimidation by Anonymous communication or having taken precaution to conceal whence the threat comes, Punishment: As in section 506 + 2 Years, Non-Cognizable, Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
           "criminal intimidation","section 507"
        ],
        "image":"./images/24.jpeg",
        "link": "/pages/pg24.html"
    },
    {
        "id": "25",
        "title": [
            "Section 319"
        ],
        "description": [         
           "Hurt: Whoever causes bodily pain, disease or infirmity to any person is said to cause hurt."
        ],
        "keywords":[
           "hurt","section 319"
        ],
        "image":"./images/25.jpeg",
        "link": "/pages/pg25.html"
    },
    {
        "id": "26",
        "title": [
            "Section 307"
        ],
        "description": [       
            "Punishments for Attempt to Murder:Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine; and, if hurt is caused to any person by such act, the offender shall be liable either to imprisonment for life, or to such punishment as is hereinbefore mentioned.\\n\\Attempts by Life Convicts: When any person offending under this section is under sentence of imprisonment for life, he may, if hurt is caused, be punished with death.\\n\\Offence: Attempt to murder, Punishment: 10years + Fine, Cognizable, Non-Bailable, Triable by Court of Session"
        ],
        "keywords":[
           "murder","attempt to murder","section 307"
        ],
        "image":"./images/26.jpeg",
        "link": "/pages/pg26.html"
    },
    {
        "id": "27",
        "title": [
            "Section 302"
        ],
        "description": [       
            "Punishments for Murder: Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.\\n\\ Offences: Murder, Punishment; Death or Imprisonment for life + Fine, Cognizable, Non-Bailable, Triable by Court of Session"
            
        ],
        "keywords":[
           "murder","punishment for murder", "session 302"
        ],
        "image":"./images/27.jpeg",
        "link": "/pages/pg27.html"
    },
    {
        "id": "28",
        "title": [
            "Section 441"
        ],
        "description": [       
            "Whoever enters into or upon property in the possession of another with intent to commit an offence or to intimidate, insult or annoy any person in possession of such property, or having lawfully entered into or upon such property, unlawfully remains there with intent thereby to intimidate, insult or annoy any such person, or with intent to commit an offence, is said to commit “criminal trespass”"
        ],
        "keywords":[
           "criminal trespass","section 441"
        ],
        "image":"./images/28.jpeg",
        "link": "/pages/pg28.html"
    },
    {
        "id": "29",
        "title": [
            "Section 442"
        ],
        "description": [       
           "Whoever commits criminal trespass by entering into or remaining in any building, tent or vessel used as a human dwelling or any building used as a place for worship, or as a place for the custody of property, is said to commit house-trespass"
        ],
        "keywords":[
           "criminal trespass","house trespass","session 442"
        ],
        "image":"./images/29.jpeg",
        "link": "/pages/pg29.html"
    },
    {
        "id": "30",
        "title": [
            "Section 443"
        ],
        "description": [       
           "Whoever commits house-trespass having taken precautions to conceal such house-trespass from some person who has a right to exclude or eject the trespasser from the building, tent or vessel which is the subject of the trespass, is said to commit lurking house-trespass"
        ],
        "keywords":[
           "criminal trespass","lurking house trespass","section 443"
        ],
        "image":"./images/30.jpeg",
        "link": "/pages/pg30.html"
    },
    {
        "id": "31",
        "title": [
            "Section 142"
        ],
        "description": [       
           "Whoever, being aware of facts which render any assembly an unlawful assembly, intentionally joins that assembly, or continues in it, is said to be a member of an unlawful assembly."
        ],
        "keywords":[
           "unlawful assembly","section 142"
        ],
        "image":"./images/31.jpeg",
        "link": "/pages/pg31.html"
    },
    {
        "id": "32",
        "title": [
           "Section 378"
        ],
        "description": [       
           "Theft: Whoever, intending to take dishonestly any movable property out of the possession of any person without that persons consent, moves that property in order to such taking, is said to commit theft."
        ],
        "keywords":[
           "theft","section 378"
        ],
        "image":"./images/32.jpeg",
        "link": "/pages/pg32.html"
    },
    {
        "id": "33",
        "title": [
           "Section 379"
        ],
        "description": [       
           "Punishment for theft: Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.\\n\\Offences:Theft, Punishment: 3years or Fine or Both, Cognizable, Non-Bailable, Triable by Any Magistrate."
        ],
        "keywords":[
           "theft","punishment for theft","section 379"
        ],
        "image":"./images/33.jpeg",
        "link": "/pages/pg33.html"
    },
    {
        "id": "34",
        "title": [
           "Section 295A"
        ],
        "description": [       
           "Deliberate and malicious acts, intended to outrage religious feelings of any class by insulting its religion or religious beliefs: Whoever, with deliberate and malicious intention of outraging the religious feelings of any class of citizens of India, by words, either spoken or written, or by signs or by visible representations or otherwise insults or attempts to insult the religion or the religious beliefs of that class, shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.\\n\\Offences: Maliciously insulting the religions or the religious beliefs of any class, Punishment: 3 years or Fine or Both, Cognizable, Non-Bailable, Triable by Magisrate first class."
        ],
        "keywords":[
           "religion","offence related to religion","section 295A"
        ],
        "image":"./images/14.jpeg",
        "link": "/pages/pg34.html"
    },
    {
        "id": "35",
        "title": [
           "Section 390"
        ],
        "description": [       
           "Robbery : \\n\\ In all robbery there is either theft or extortion.\\n\\When theft is robbery - Theft is “robbery” if, in order to the committing of the theft, or in committing the theft, or in carrying away or attempting to carry away property obtained by the theft, the offender, for that end, voluntarily causes or attempts to cause to any person death or hurt or wrongful restraint, or fear of instant death or of instant hurt, or of instant wrongful restraint.\\n\\When extortion is robbery — Extortion is “robbery” if the offender, at the time of committing the extortion, is in the presence of the person put in fear, and commits the extortion by putting that person in fear of instant death, of instant hurt, or of instant wrongful restraint to that person or to some other person, and, by so putting in fear, induces the person, so put in fear then and there to deliver up the thing extorted."
        ],
        "keywords":[
           "robbery","theft","extortion","section 390"
        ],
        "image":"./images/15.jpeg",
        "link": "/pages/pg35.html"
    },
    {
        "id": "36",
        "title": [
           "Section 392"
        ],
        "description": [       
           "Punishment for robbery: Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine; and, if the robbery be committed on the highway between sunset and sunrise, the imprisonment may be extended to fourteen years.\\n\\Offences: Robbery, Punishment: Rigorous Imprisonment for 10years + Fine, Cognizable, Non-Bailable, Triable by Magistrate first class"
        ],
        "keywords":[
           "robbery","section 392"
        ],
        "image":"./images/36.jpeg",
        "link": ""
    },
    {
        "id": "37",
        "title": [
           "Section 120B"
        ],
        "description": [       
           "Punishment of criminal conspiracy:\\n\\(1) Whoever is a party to a criminal conspiracy to commit an offence punishable with death, imprisonment for life or rigorous imprisonment for a term of two years or upwards, shall, where no express provision is made in this Code for the punishment of such a conspiracy, be punished in the same manner as if he had abetted such offence. (2) Whoever is a party to a criminal conspiracy other than a criminal conspiracy to commit an offence punishable as aforesaid shall be punished with imprisonment of either description for a term not exceeding six months, or with fine or with both.\\n\\Offences: Criminal conspiracy to commit an offence, Punishable with death, imprisonment for life or rigorous imprisonment for a term of 2 Years or upwards, Punishment:10years + fine, Non-cognizable, Non-Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
           "criminal conspiracy", "punishment of criminal conspiracy","section 120b"
        ],
        "image":"./images/17.jpeg",
        "link": "/pages/pg37.html"
    },
    {
        "id": "38",
        "title": [
           "IPC Chapter 11"
        ],
        "description": [       
           "Whoever fraudulently or dishonestly, or with intent to injure or annoy any person, makes in a Court of Justice any claim which he knows to be false, shall be punished with imprisonment of either description for a term which may extend to two years, and shall also be liable to fine."
        ],
        "keywords":[
           "offence again public justice","public justice"
        ],
        "image":"./images/28.jpeg",
        "link": "/pages/pg38.html"
    },
    {
        "id": "39",
        "title": [
           "Section 363"
        ],
        "description": [       
           "Punishment for kidnapping: Whoever kidnaps any person from India or from lawful guardianship, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\\n\\ Offences: Kidnapping, Punishment: 7years + Fine, Cognizable, Bailable, Triable by Magistrate First Class."
        ],
        "keywords":[
           "kidnapping","punishment for kidnapping","section 363"
        ],
        "image":"./images/29.jpeg",
        "link": "/pages/pg39.html"
    },
    {
        "id": "40",
        "title": [
           "Section 278"
        ],
        "description": [       
           "Making atmosphere noxious to health.—Whoever voluntarily vitiates the atmosphere in any place so as to make it noxious to the health of persons in general dwelling or carrying on business in the neighbourhood or passing along a public way, shall be punished with fine which may extend to five hundred rupees.\\n\\Offences: Making atmosphere noxious to health, punishment: Fine, Non-Cognizable, Bailable, Triable by Any Magistrate."
        ],
        "keywords":[
           "atmosphere","health","humans health","section 278"
        ],
        "image":"./images/10.jpeg",
        "link": "/pages/pg40.html"
    },
    {
        "id": "41",
        "title": [
           "IPC Chapter 14"
        ],
        "description": [       
           "Of Offences Affecting The Public Health, Safety, Convenience, Decency and Morals.."
        ],
        "keywords":[
           "offence affecting public safety","Public Nuisance","noxious food or drink"
        ],
        "image":"./images/11.jpeg",
        "link": "/pages/pg41.html"
    },
    {
        "id": "42",
        "title": [
           "Section 283"
        ],
        "description": [       
           "Danger or Obstruction in public way or line of navigation: Whoever, by doing any act, or by omitting to take order with any property in his possession or under his charge, causes danger, obstruction or injury to any person in any public way or public line of navigation, shall be punished, with fine which may extend to two hundred rupees.\\n\\Offence: Causing danger, obstruction or, injury in any public way or line of navigation, Punishment: Fine, Cognizable, Bailable, Triable by Any Magistrate."
        ],
        "keywords":[
           "offence affecting public safety","public safety","section 283"
        ],
        "image":"./images/22.jpeg",
        "link": "/pages/pg42.html"
    },
    {
        "id": "43",
        "title": [
           "Section 143"
        ],
        "description": [       
           "Punishment: Whoever is a member of an unlawful assembly, shall be punished with imprisonment of either description for a term which may extend to six months, or with fine, or with both.\\n\\Offence: Being member of an unlawful assembly, punishment: 6months or Fine or Both, Cognizable, Bailable, Triable by Any magistrate."
        ],
        "keywords":[
           "unlawful assembly"
        ],
        "image":"./images/23.jpeg",
        "link": "/pages/pg43.html"
    },
    {
        "id": "44",
        "title": [
           "Section 354A"
        ],
        "description": [       
           "Sexual harassment and punishment for sexual harassment--\\n\\(1) Aman committing any of the following acts-- \\n\\(i) physical contact and advances involving unwelcome and explicit sexual overtures; or. \\n\\(ii) a demand or request for sexual favours; or. (iii) showing pornography against the will of a woman.\\n\\(2Any man who commits the offence specified in clause (i) or clause (ii) or clause (iii) of sub-section (1) shall be punished with rigorous imprisonment for a term which may extend to three years, or with fine, or with both."
        ],
        "keywords":[
           "sexual offence","sexual harassment","physical contact","section 354a"
        ],
        "image":"./images/4.jpeg",
        "link": "/pages/pg44.html"
    },
    {
        "id": "45",
        "title": [
           "Section 141"
        ],
        "description": [       
            "An assembly of five or more persons is designated an “unlawful assembly”, if the common object of the persons composing that assembly is:\\n\\(1)To overawe by criminal force, or show of criminal force, the Central or any State Government or Parliament or the Legislature of any State, or any public servant in the exercise of the lawful power of such public servant.\\n\\(2)To resist the execution of any law, or of any legal process.\\n\\(3)To commit any mischief or criminal trespass, or other offence."
        ],
        "keywords":[
           "unlawful assembly","section 141"
        ],
        "image":"./images/4.jpeg",
        "link": "/pages/pg45.html"
    },
    {
        "id": "46",
        "title": [
           "Section 359"
        ],
        "description": [       
           "Kidnapping is of two kinds: kidnapping from 1[India], and kidnapping from lawful guardianship."
        ],
        "keywords":[
           "kidnapping","types of kidnapping","section 359"
        ],
        "image":"./images/1.jpeg",
        "link": "/pages/pg46.html"
    },
    {
        "id": "47",
        "title": [
           "Section 363"
        ],
        "description": [       
           "Punishment for kidnapping. Previous Next. Whoever kidnaps any person from 1 [India] or from lawful guardianship, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.\\n\\Offences: Kidnapping, Punishment:7years + Fine, Cognizable, Bailable, Triable by Magistrate first class."
        ],
        "keywords":[
           "kidnapping","kidnapp","kidnapped","punishment for kidnapping","section 363"
        ],
        "image":"./images/1.jpeg",
        "link": "/pages/pg47.html"
    },
    {
        "id": "48",
        "title": [
           "Section 406"
        ],
        "description": [       
           "Punishment for criminal breach of trust: Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.\\n\\Offences: Criminal breach of trust, Punishment: 3years or Fine or Both, Cognizable, Non-Bailable, Triable by Magistrate first class."
        ],
        "keywords":[
           "criminal breach","criminal breach of trust","section 406"
        ],
        "image":"./images/1.jpeg",
        "link": "/pages/pg48.html"
    },
    {
        "id": "49",
        "title": [
           "Section 465"
        ],
        "description": [       
           "Punishment for forgery: Whoever commits forgery shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.\\n\\Offences: Forgery, Punishment: 2years or Fine or Both, Non-cognizable, Bailable, Triable by Magistrate first class. "
        ],
        "keywords":[
           "forgery","punishment for forgery","section 465"
        ],
        "image":"./images/1.jpeg",
        "link": "/pages/pg49.html"
    }
    

];
// Start the conversation by asking the first question
askQuestion();
