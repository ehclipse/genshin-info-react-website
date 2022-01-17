
import React, {useState, useEffect} from 'react';
import bg from '../images/bg.jfif';
import { Autocomplete, TextField } from '@mui/material';
import {v4 as uuidv4} from 'uuid';




const Home = () => {
    const [characterSearch, setcharacterSearch] = useState(true);
    const [artifactSearch, setartifactSearch] = useState(false);
    const [weaponSearch, setweaponSearch] = useState(false);
    const [choice, setChoice] = useState("ganyu");
    const [data, setData] = useState(null);

    const [rarity, setRarity] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const charList = [
        "albedo",
        "aloy",
        "amber",
        "arataki-itto",
        "ayaka",
        "barbara",
        "beidou",
        "bennett",
        "chongyun",
        "diluc",
        "diona",
        "eula",
        "fischl",
        "ganyu",
        "hu-tao",
        "jean",
        "kaeya",
        "kazuha",
        "keqing",
        "klee",
        "kokomi",
        "lisa",
        "mona",
        "ningguang",
        "noelle",
        "qiqi",
        "raiden",
        "razor",
        "rosaria",
        "sara",
        "sayu",
        "sucrose",
        "tartaglia",
        "thoma",
        "traveler-anemo",
        "traveler-electro",
        "traveler-geo",
        "venti",
        "xiangling",
        "xiao",
        "xingqiu",
        "xinyan",
        "yanfei",
        "yoimiya",
        "zhongli"
    ]

    const artifactList = [
        "adventurer",
        "archaic-petra",
        "berserker",
        "blizzard-strayer",
        "bloodstained-chivalry",
        "brave-heart",
        "crimson-witch-of-flames",
        "defender-s-will",
        "emblem-of-severed-fate",
        "gambler",
        "glacier-and-snowfield",
        "gladiator-s-finale",
        "heart-of-depth",
        "instructor",
        "lavawalker",
        "lucky-dog",
        "maiden-beloved",
        "martial-artist",
        "noblesse-oblige",
        "pale-flame",
        "prayers-for-destiny",
        "prayers-for-illumination",
        "prayers-for-wisdom",
        "prayers-to-springtime",
        "prayers-to-the-firmament",
        "resolution-of-sojourner",
        "retracing-bolide",
        "scholar",
        "shimenawa-s-reminiscence",
        "tenacity-of-the-millelith",
        "the-exile",
        "thundering-fury",
        "thundersoother",
        "tiny-miracle",
        "traveling-doctor",
        "viridescent-venerer",
        "wanderer-s-troupe"
    ]

    const weaponList = [
        "alley-hunter",
        "amber-catalyst",
        "amenoma-kageuchi",
        "amos-bow",
        "apprentice-s-notes",
        "aquila-favonia",
        "beginner-s-protector",
        "black-tassel",
        "blackcliff-amulet",
        "blackcliff-longsword",
        "blackcliff-pole",
        "blackcliff-slasher",
        "blackcliff-warbow",
        "bloodtainted-greatsword",
        "compound-bow",
        "cool-steel",
        "crescent-pike",
        "dark-iron-sword",
        "deathmatch",
        "debate-club",
        "dodoco-tales",
        "dragon-s-bane",
        "dragonspine-spear",
        "dull-blade",
        "ebony-bow",
        "elegy-for-the-end",
        "emerald-orb",
        "engulfing-lightning",
        "everlasting-moonglow",
        "eye-of-perception",
        "favonius-codex",
        "favonius-greatsword",
        "favonius-lance",
        "favonius-sword",
        "favonius-warbow",
        "ferrous-shadow",
        "festering-desire",
        "fillet-blade",
        "freedom-sworn",
        "frostbearer",
        "hakushin-ring",
        "halberd",
        "hamayumi",
        "harbinger-of-dawn",
        "hunter-s-bow",
        "iron-point",
        "iron-sting",
        "katsuragikiri-nagamasa",
        "kitain-cross-spear",
        "lion-s-roar",
        "lithic-blade",
        "lithic-spear",
        "lost-prayer-to-the-sacred-winds",
        "luxurious-sea-lord",
        "magic-guide",
        "mappa-mare",
        "memory-of-dust",
        "messenger",
        "mistsplitter-reforged",
        "mitternachts-waltz",
        "old-merc-s-pal",
        "otherworldly-story",
        "pocket-grimoire",
        "predator",
        "primordial-jade-cutter",
        "primordial-jade-winged-spear",
        "prototype-archaic",
        "prototype-crescent",
        "prototype-grudge",
        "prototype-malice",
        "prototype-rancour",
        "quartz",
        "rainslasher",
        "raven-bow",
        "recurve-bow",
        "royal-bow",
        "royal-greatsword",
        "royal-grimoire",
        "royal-longsword",
        "royal-spear",
        "rust",
        "sacrificial-bow",
        "sacrificial-fragments",
        "sacrificial-greatsword",
        "sacrificial-sword",
        "seasoned-hunter-s-bow",
        "serpent-spine",
        "sharpshooter-s-oath",
        "silver-sword",
        "skyrider-greatsword",
        "skyrider-sword",
        "skyward-atlas",
        "skyward-blade",
        "skyward-harp",
        "skyward-pride",
        "skyward-spine",
        "slingshot",
        "snow-tombed-starsilver",
        "solar-pearl",
        "song-of-broken-pines",
        "staff-of-homa",
        "summit-shaper",
        "sword-of-descension",
        "the-alley-flash",
        "the-bell",
        "the-black-sword",
        "the-catch",
        "the-flute",
        "the-stringless",
        "the-unforged",
        "the-viridescent-hunt",
        "the-widsith",
        "thrilling-tales-of-dragon-slayers",
        "thundering-pulse",
        "traveler-s-handy-sword",
        "twin-nephrite",
        "vortex-vanquisher",
        "waster-greatsword",
        "white-iron-greatsword",
        "white-tassel",
        "whiteblind",
        "windblume-ode",
        "wine-and-song",
        "wolf-s-gravestone"
    ]

    const baseURL = "https://api.genshin.dev";

    useEffect(() => {
        var category = "";

        if(characterSearch)
        {
            category = "characters";
            fetch(`${baseURL}/${category}/${choice}/card`) // fetches character img
                .then((response) => response.blob())
                .then((img) => {
                    setThumbnail(URL.createObjectURL(img));
                });
            
        }
        else if(artifactSearch)
        {
            category = "artifacts";
        }
        else if(weaponSearch)
        {
            category = "weapons";
            fetch(`${baseURL}/${category}/${choice}/icon`) // fetches weapon img
                .then((response) => response.blob())
                .then((img) => {
                    setThumbnail(URL.createObjectURL(img));
                });
        }
    
        fetch(`${baseURL}/${category}/${choice}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                if(characterSearch || weaponSearch)
                {
                    let rarityStars = ""
                    for(let x = 0; x < data.rarity; x++)
                        rarityStars += "⭐";
                    setRarity(rarityStars);
                }
                else
                {
                    let rarityStars = ""
                    for(let x = 0; x < data.max_rarity; x++)
                        rarityStars += "⭐";
                    setRarity(rarityStars);
                }
            });



    }, [choice]);
   

    return (
        <div className='homePage' style={homePageStyle}>
            <div className='navBar' style={navBarStyle}>
               {/* <h2 style={{marginLeft: '50px', borderColor: '#09044d',}}>History</h2>
                <h2 style={{marginRight: '50px', borderColor: '#09044d'}}>Login</h2> */}
            </div>
            <div className='content' style={contentStyle}>
                <h3>Welcome to the Abyss Information Hub!</h3>
                <p>All the info in Genshin can be found here with a single search</p>
            </div>
            <div className='searchContainer' style={searchContainerStyle}>
                <div className='searchOptions'>
                    <ul style={searchOptionsStyle}>
                        <button type="button" style={searchItemStyle} onClick={() => {setThumbnail(null); setData(null); setChoice("ganyu"); setcharacterSearch(!characterSearch); setartifactSearch(false); setweaponSearch(false);}}>Characters</button>
                        <button type="button" style={searchItemStyle} onClick={() => {setThumbnail(null); setData(null); setChoice("adventurer"); setartifactSearch(!artifactSearch); setweaponSearch(false); setcharacterSearch(false);}}>Artifacts</button>
                        <button type="button" style={searchItemStyle} onClick={() => {setThumbnail(null); setData(null); setChoice("snow-tombed-starsilver"); setweaponSearch(!weaponSearch); setcharacterSearch(false); setartifactSearch(false);}}>Weapons</button>
                    </ul>
                </div>
                {       
                    characterSearch &&
                    <Autocomplete
                        disablePortal
                        id="char-search"
                        options={charList}
                        sx={{ width: '75%' }}
                        renderInput={(params) => <TextField {...params} label="Characters"/>} 
                        onChange={(event, value) => setChoice(value)}
                    />
                }
                {       
                    artifactSearch &&
                    <Autocomplete
                        disablePortal
                        id="artifact-search"
                        options={artifactList}
                        sx={{ width: '75%' }}
                        renderInput={(params) => <TextField {...params} label="Artifacts" />}
                        onChange={(event, value) => setChoice(value)}
                    />
                }
                {       
                    weaponSearch &&
                    <Autocomplete
                        disablePortal
                        id="weapon-search"
                        options={weaponList}
                        sx={{ width: '75%' }}
                        renderInput={(params) => <TextField {...params} label="Weapons" />}
                        onChange={(event, value) => setChoice(value)}
                    />
                }
            </div>


            {/* CHARACTERS SECTION  */}
            {characterSearch && data && <div className='charResultContainer' style={resultContainerStyle}>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div style={{padding: '100px', maxWidth: '60ch', borderRadius: '50px', color: 'white', marginTop: '100px', marginBottom: '100px',textAlign: 'center', backgroundColor: '#171717', }}>
                        <h1>{data.name}</h1>
                        <h2>{rarity}</h2>
                        <p>
                            Vision: {data.vision}<br/>
                            Weapon: {data.weapon}<br/>
                            Nation: {data.nation}<br/>
                            Affiliation: {data.affiliation}<br/>
                            Birthday: {data.birthday}
                        </p>
                        <p>
                            {data.description}
                        </p>    
                    </div>
                    {thumbnail && <img src={thumbnail} alt="paimon" width="25%" style={{margin: '50px'}}/>}
                </div>
                
                <div style ={{display: 'flex', justifyContent: 'center'}}> {/* Row 2 */}
                    <div style={{padding: '100px', maxWidth: '60ch',borderRadius: '50px', color: 'white', margin: '100px', textAlign: 'center', backgroundColor: '#171717', }}>
                        <h2>Skill Talents</h2>
                        {
                            data.skillTalents.map((element) => {
                                return <div key={uuidv4()}>
                                            <h3>{element.name}</h3>
                                            <p>{element.unlock}</p>
                                            <p>{element.description}</p>
                                            <br/>
                                            <br/>
                                        </div>
                            })
                        }
                    </div>
                    <div style={{padding: '100px', maxWidth: '60ch', borderRadius: '50px',color: 'white', margin: '100px', textAlign: 'center', backgroundColor: '#171717', minWidth: '15vw', minHeight: '25vh'}}>
                        <h2>Passive Talents</h2>
                        {
                            data.passiveTalents.map((element) => {
                                return <div key={uuidv4()}>
                                            <h3>{element.name}</h3>
                                            <p>{element.unlock}</p>
                                            <p>{element.description}</p>
                                            <br/>
                                            <br/>
                                        </div>
                            })
                        }
                    </div>
                </div>
        
                <div style={{padding: '100px', maxWidth: '60ch',borderRadius: '50px', color: 'white', margin: '100px', textAlign: 'center', backgroundColor: '#171717', minHeight: '25vh'}}>
                    <h2>Constellations</h2>
                    {
                        data.constellations.map((element) => {
                            return <div key={uuidv4()}>
                                        <h3>{element.name}</h3>
                                        <p>{element.unlock}</p>
                                        <p>{element.description}</p>
                                        <br/>
                                        <br/>
                                    </div>
                        })
                    }
                </div>
                
            </div>}

            {/* ARTIFACTS SECTION  */}
            {artifactSearch && data && <div className='artResultContainer' style={resultContainerStyle}>
                <div style={{ maxWidth: '60ch', borderRadius: '50px', color: 'white', padding: '100px', margin: '100px', textAlign: 'center', backgroundColor: '#171717', }}> 
                        <h1>{data.name} <br/></h1>
                        <p>
                            Max Rarity: {rarity} <br/>
                            2-Piece Set Bonus: {data['2-piece_bonus']} <br/>
                            4-Piece Set Bonus: {data['4-piece_bonus']}
                        </p>
                </div>
            </div>}

            {/* WEAPONS SECTION */}
            {weaponSearch && data && <div className='charResultContainer' style={resultContainerStyle}>
                
                <div style={{margin: '100px',textAlign: 'center',}}>
                    {thumbnail && <img src={thumbnail} alt="paimon" />}
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}> {/* Column */}
                    <div style={{borderRadius: '50px', color: 'white', padding: '100px', margin: '100px', textAlign: 'center', backgroundColor: '#171717', }}>
                        <h1>
                            {data.name} 
                        </h1>
                        <h2>
                            {rarity}
                        </h2>
                        <p>
                            Type: {data.type}<br/>
                            Base Attack: {data.baseAttack}<br/>
                            Substat: {data.subStat}
                        </p>
                    </div>
                    <div style={{padding: '100px', maxWidth: '60ch', borderRadius: '50px', color: 'white', margin: '100px', textAlign: 'center', backgroundColor: '#171717', minWidth: '15vw', }}>
                        <h2>Passive:</h2>
                        <h3>{data.passiveName}</h3>
                        <p>
                            {data.passiveDesc}
                        </p>
                    </div>
                </div>
            </div>}

        </div>
    )
}


const homePageStyle = {
    backgroundColor: '#09044d', // dark
    height: '100vh',
    width: '100vw',
}

const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '100px',
    flexDirection: 'column',
    color: '#2C489C',  // KEEP THIS COLOR 2C489C
    background: `linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,100, .75)), url(${bg}`,
    //flexGrow: '1',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
  

}

const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#2C489C',
    backgroundColor: '#020021',//'#16124a'//'#231F58' // bright
}

const searchContainerStyle = {  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',


}

const searchOptionsStyle = {
    display: 'flex',
    listStyleType: 'none',
}

const searchItemStyle = {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    marginLeft: '25px',
    fontWeight: 'bold',
    fontSize: '16pt'
    
}

const resultContainerStyle = {
    backgroundColor: '#2e2d2d',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  
  
}

export default Home
