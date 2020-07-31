$(document).ready(() => {
    const createForm = $("form.newcharacter");
    const nameInput = $("input#character-name");
    const classSelection = $("select#class-input");
    const raceSelection = $("select#race-input");
    const subClassSelection = $("select#subclass-input");
    const subRaceSelection = $("select#subrace-input");
    const campaignSelection = $("select#campaign-input");
    const briefBioInput = $("textarea#bio-input");



    // make api calls
    // get all the classes from the Dungeons and Dragons api
    const getClasses = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/classes",
            method: "GET"
        }).then(response => {
            let classNames = response.results.map(object => object.name);

            for (let i = 0; i < classNames.length; i++) {
                $("#class-input").append($(`
                <option value = ${classNames[i]}> ${classNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    // get all the races from the Dungeons and Dragons api
    const getRaces = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/races",
            method: "GET"
        }).then(response => {
            let raceNames = response.results.map(object => object.name);

            for (let i = 0; i < raceNames.length; i++) {
                $("#race-input").append($(`
                <option value = ${raceNames[i]}> ${raceNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    // get all the subclasses from the Dungeons and Dragons api
    const getSubClasses = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/subclasses",
            method: "GET"
        }).then(response => {
            let subclassNames = response.results.map(object => object.name);

            for (let i = 0; i < subclassNames.length; i++) {
                $("#subclass-input").append($(`
                <option value = ${subclassNames[i]}> ${subclassNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    // get all the subraces from the Dungeons and Dragons api
    const getSubRaces = () => {
        $.ajax({
            url: "https://www.dnd5eapi.co/api/subraces",
            method: "GET"
        }).then(response => {
            let subraceNames = response.results.map(object => object.name);

            for (let i = 0; i < subraceNames.length; i++) {
                $("#subrace-input").append($(`
                <option value = ${subraceNames[i]}> ${subraceNames[i]} </option>
                `));
            };
        }).catch(err => {
            throw err;
        })
    };
    //somewhat confident this won't suck
    const getCampaigns = () => {
        $.get("/api/campaigns").then(dbCampaigns => {
            dbCampaigns.map(campaign => {
                $("#campaign-input").append($(
                    `<option value = ${campaign.id}> ${campaign.name} </option>`
                ));
            });
        });
    }

    getClasses();
    getRaces();
    getSubClasses();
    getSubRaces();
    getCampaigns();


    createForm.on("submit", (event) => {
        event.preventDefault();

        const newCharacter = {
            name: nameInput.val().trim(),
            class: classSelection.val().trim(),
            race: raceSelection.val().trim(),
            subClass: subClassSelection.val().trim(),
            subRace: subRaceSelection.val().trim(),
            campaign: campaignSelection.val(),
            briefBio: briefBioInput.val().trim()
        };

        if (!newCharacter.name || !newCharacter.class || !newCharacter.race) {
            //find a way to handle this so the user knows "can't have a blank name... or blank class..."
            return;
        }

        createCharacter(newCharacter);
        //there's no point in me making this object 
        // createCharacter(newCharacter.name, newCharacter.class, newCharacter.race,
        //     newCharacter.subClass, newCharacter.subRace, campaignId, newCharacter.briefBio);

        nameInput.val("");
        classSelection.val("");
        raceSelection.val("");
        subClassSelection.val("");
        subRaceSelection.val("");
        campaignSelection.val("");
        briefBioInput.val("");
    });

    function createCharacter(newCharacter) {
        $.post("/api/characters", {
            name: newCharacter.name,
            class: newCharacter.class,
            race: newCharacter.race,
            subClass: newCharacter.subClass,
            subRace: newCharacter.subRace,
            briefBio: newCharacter.briefBio,
            campaign: newCharacter.campaign
        }).then(() => {
            window.location.replace("/characterview");
        }).catch((err) => {
            console.log(err);
        });
    };




});


