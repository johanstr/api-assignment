
var query = window.location.search.substring(1);

function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}

var qs = parse_query_string(query);
// console.log(qs);

let url = "https://jsonplaceholder.typicode.com/posts/" + qs.id + "/comments";
let output = document.querySelector('#output');


window.onload = function () {
    callApi();
}

async function callApi()
{
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++)
            {
                let template = `
                <div class="card cyan lighten-5">
                <div class="card-content">
                    <div class="collection">
                        <div class="collection-item row">
                            <div class="col s3">
                                <div class="avatar collection-link">
                                    <div class="row">
                                        <div class="col s3">
                                            <img src="http://www.gravatar.com/avatar/fc7d81525f7040b7e34b073f0218084d?s=50" alt="" class="square">
                                        </div>
                                        <div class="col s9">
                                            <p class="user-name">XXX</p>
                                        </div>
                                    </div>
                                    <p class="post-timestamp">
                                        Gepost op XX-XX-XXXX XX:XX
                                    </p>
                                </div>
                            </div>
                            <div class="col s9">
                                <div class="row last-row">
                                    <div class="col s12">
                                        <h6 class="title">
                                            <!-- HIER KOMT DE TITEL VAN DE COMMENT -->
                                            ${data[index].name}
                                        </h6>
                                        <p>
                                            <!-- HIER KOMT DE BODY VAN DE COMMENT -->
                                            ${data[index].body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;

                output.innerHTML += template;
            }
        })
        .catch(error => consolo.log(error));
}