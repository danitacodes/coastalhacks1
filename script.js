
//Beach Dropdown
let dropdown = document.getElementById('beach-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose a Beach';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'https://api.coastal.ca.gov/access/v1/locations';


fetch(url)
.then(
    function(res) {
        if (res.status !== 200) {
            console.warn('Looks like there was a problem')
            return;
        }
        res.json().then(function(data) {
            let option;

            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].NameMobileWeb;
                dropdown.add(option)
            }
        });
        
    }
)
.catch(function(err) {
    console.error(`There was an error: ${err}`)
})

const select = document.querySelector('select');
select.addEventListener('change', displayBeachInfo);

async function displayBeachInfo() {
    let beachName = document.getElementById('beach-dropdown');
    let value = beachName.options[beachName.selectedIndex].value;
    
    document.getElementById('beach-dropdown').value = value;
    
    await fetch(`https://api.coastal.ca.gov/access/v1/locations/name/${value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data[0])
        document.getElementById('beach-info').innerHTML = `
        <section class="form my-4 mx-5">
            <div class="container beachInfo">
                <div class="row no-gutters">
                    <div class="col-lg-5">
                    <h1 py-3>${data[0].NameMobileWeb}</h1>
                    <p><strong>County</strong>: ${data[0].COUNTY}</p>
                    <p><strong>Descripton</strong>: ${data[0].DescriptionMobileWeb}</p>
                    <p><strong>Does it cost to enter</strong>: ${data[0].FEE}</p>
                    <p><strong>Is there parking</strong>: ${data[0].PARKING}</p>
                    <p><strong>Is it wheelchair accessible</strong>: ${data[0].DSABLDACSS}</p>
                    <p><strong>Is it stroller accessible</strong>: ${data[0].EZ4STROLLERS}</p>
                    <p><strong>Are there restrooms</strong>: ${data[0].RESTROOMS}</p>
                    <p><strong>Does it have a Visitor Center</strong>: ${data[0].VISTOR_CTR}</p>
                    <p><strong>Is it dog friendly</strong>: ${data[0].DOG_FRIENDLY}</p>
                    <p><strong>Does it have picinic areas</strong>: ${data[0].PCNC_AREA}</p>
                    <p><strong>Does it have campgrounds</strong>: ${data[0].CAMPGROUND}</p>
                    </div>
                    <div class="col-lg-7 px-5 pt-5 holder">
                        <img src="${data[0].Photo_1}" class="img-fluid">            
                    </div>
                </div>
            </div>
            </section>
        `        
    })
    
}
