var xmlHttp;
var searchActorName;
var currentActorId = null;
var connIdList = new Array();
var actorIdList = new Array();
var connectTypes = new Array();
var inConnectByType = new Object();
var outConnectByType = new Object();
var inConnects = new Object();
var outConnects = new Object();
var outConnectActors = new Object();
var inConnectActors = new Object();
var actors = new Object();


function pageLoad()
{
  if ( currentActorId == null )
  {
    initActor(1);
  }
}


function toggleList(cell, pic)
{
  var td = document.getElementById(cell);
  var im = document.getElementById(pic);
  if (td.style.display != "none") {
    td.style.display = 'none';
    im.src = 'art/plus_button.jpg';
  }
  else {
    td.style.display = '';
    im.src = 'art/minus_button.jpg';
  }
}



function collapse()
{
  var i;
  for ( i = 0; i < connectTypes.length; i++ )
  {
    tag = connectTypes[i];
    if ( inConnectByType[tag].length > 0 )
    {
      var objName = "in_" + tag + "_list";
      var obj = document.getElementById(objName);
      obj.style.display = 'none';
    }
    if ( outConnectByType[tag].length > 0 )
    {
      objName = "out_" + tag + "_list";
      obj = document.getElementById(objName);
      obj.style.display = 'none';
    }
  }
}


function initActor(id)
{
  currentActorId = id;
  getActorInfo(id, handleActorInfo);
}


function addConnectType(tag)
{
  var j;
  var found = false;
  for (j = 0; j < connectTypes.length; j++)
  {
    if ( connectTypes[j] == tag )
    {
      found = true;
      break;
    }
  }
  if ( !found )
  {
    connectTypes.push(tag);
    inConnData = new Array();
    inConnectByType[tag] = inConnData;
    outConnData = new Array();
    outConnectByType[tag] = outConnData;
  }
}


function clearInConnects()
{
  inConnects = new Object();
  for ( i = 0; i < connectTypes.length; i++ )
  {
    tag = connectTypes[i];
    inConnectByType[tag] = new Array();
  }
}


function clearOutConnects()
{
  outConnects = new Object();
  for ( i = 0; i < connectTypes.length; i++ )
  {
    tag = connectTypes[i];
    outConnectByType[tag] = new Array();
  }
}


function selectIn()
{
  selectedId = document.getElementById("inconnect").value
  connData = inConnects["conn_" + selectedId];
  sourceId = connData.source;
  currentActorId = sourceId;
  getActorInfo(sourceId, handleActorInfo);
}


function selectOut()
{
  selectedId = document.getElementById("outconnect").value
  connData = outConnects["conn_" + selectedId]
  targetId = connData.target;
  currentActorId = targetId;
  getActorInfo(targetId, handleActorInfo);
}


function selectOutConnect()
{
  selectedId = document.getElementById("outconnect").value
  var docStr = "";
  connData = outConnects["conn_" + selectedId];
  tag = connData.tag;
  docStr = "Relationship: " + tag + "<BR/>\n";
  // document.getElementById("outconnectinfo").innerHTML = docStr;
}

function selectInConnect()
{
  selectedId = document.getElementById("inconnect").value
  var docStr = "";
  connData = inConnects["conn_" + selectedId];
  tag = connData.tag;
  docStr = "Relationship: " + tag + "<BR/>\n";
  // document.getElementById("inconnectinfo").innerHTML = docStr;
}


function checkEnter(e)
{
  var keyCode;
  if ( e && e.which )
  {
    keyCode = e.which;
  }
  else
  {
    // IE
    keyCode = e.keyCode;
  }

  var result = false;
  if ( keyCode == 13 )
  {
    result = true;
  }
  return result;
}

  
function checkEnterAndSearchActor(e)
{
  if ( checkEnter(e) )
  {
    searchActor();
  }
}


function searchActor()
{
  searchActorName = document.getElementById("searchactorname").value;

  // TODO: send request to backend
  request = "data/ActorList";
  xmlHttp = getXMLHTTPObject();
  xmlHttp.onreadystatechange=handleSearchActorList;
  url = "foo.py";
  url = url + "?q=" + request;
  url = request + ".xml";  // for testing
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}


function createActor()
{
  actorName = document.getElementById("createactorname").value
  searchActor(actorName);

  // TODO: send request to backend
}


function clearSelectList(listElement)
{
  selectList = document.getElementById(listElement);
  while ( selectList.length > 0 )
  {
    selectList.remove(0);
  }
}

function appendToSelect(select, name, value)
{
  var opt = document.createElement("option");
  opt.value = value;
  opt.appendChild(document.createTextNode(name));
  select.appendChild(opt);
}


function updateActorInfoPane(name, created, updated)
{
  document.title = name;
  docStr = "Name: " + name + "<BR />\n";
  docStr = docStr + "Created: " + created + "<BR />\n";
  docStr = docStr + "Updated: " + updated + "<BR />\n";
  document.getElementById("actorinfo").innerHTML = docStr;
  document.getElementById("actorname").innerHTML = name;
}


function handleSearchActorList()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example

    xmlDoc = xmlHttp.responseXML.documentElement;
    actorList = xmlDoc.getElementsByTagName("actor");
    for ( i = 0; i < actorList.length; i++ )
    {
      actorName = actorList[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      if ( actorName == searchActorName )
      {
        actorId = actorList[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        currentActorId = actorId;
        getActorInfo(actorId, handleActorInfo);
        return;
      }
    }
    document.getElementById("actordetails").innerHTML = "";
  }
}

function handleActorInfo()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example
    xmlDoc = xmlHttp.responseXML.documentElement;
    name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    id = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    created = xmlDoc.getElementsByTagName("created-on")[0].childNodes[0].nodeValue;
    updated = xmlDoc.getElementsByTagName("updated-on")[0].childNodes[0].nodeValue;
    updateActorInfoPane(name, created, updated);

    var actorData = new Object();
    actorData.name = name;
    actorData.created = created;
    actorData.updated = updated;

    actors["actor_" + id] = actorData;

    getActorOutConnections(currentActorId);
  }
}

function getActorInfo(id, handler)
{
  xmlHttp = getXMLHTTPObject();
  xmlHttp.onreadystatechange=handler;
  url = "foo.py";
  url = url + "?q=" + id;
  url = "data/actors/" + id + ".xml";  // for testing
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}


function addTagConnectionSection(table, prefix, tag, connections)
{
  // IE hax
  var tbody = document.createElement("TBODY");
  table.appendChild(tbody);

  var row = document.createElement("tr");
  var col = document.createElement("td");
  col.setAttribute("class", "column_caption");
  col.setAttribute("onclick", "toggleList(\'" + prefix + tag + "_list\', \'" + prefix + tag + "_toggle\');");
  col.setAttribute("onmouseover", "this.className = \'column_caption_roll\';");
  col.setAttribute("onmouseout", "this.className = \'column_caption\';");
  var img = document.createElement("img");
  img.id = prefix + tag + "_toggle";
  img.src = "art/plus_button.jpg";
  img.alt = "Expand list";
  col.appendChild(img);
  text = document.createTextNode(tag);
  col.appendChild(text);
  row.appendChild(col);
  tbody.appendChild(row);
  row = document.createElement("tr");
  var div = document.createElement("div");
  div.setAttribute("id", prefix + tag + "_list");
  col = document.createElement("td");
  col.appendChild(div);
  var i;
  for ( i = 0; i < connections.length; i++ )
  {
    img = document.createElement("img");
    img.src = "art/green_dot.png";
    img.alt = "High confidence";
    div.appendChild(img);
    actorId = connections[i].id
    name = connections[i].name
    href = document.createElement("a");
    hrefText = document.createTextNode(name);
    href.appendChild(hrefText);
    href.setAttribute("href", "#");
    href.setAttribute("onclick", "initActor(" + actorId + ");");
    div.appendChild(href);
    br = document.createElement("br");
    div.appendChild(br);
  }
  row.appendChild(col);
  tbody.appendChild(row);
}


function populateConnectionInfo()
{
  // fill in the inbound field
  // document.getElementById("inconnectinfo").innerHTML = "";
  // clearSelectList("inconnects");
  // populate inconnects select list
  document.getElementById("inconnect").innerHTML = "";
  document.getElementById("outconnect").innerHTML = "";
  var i;
  for ( i = 0; i < connectTypes.length; i++ )
  {
    tag = connectTypes[i];

    table = document.getElementById("inconnect");
    connList = new Array();
    var j;
    for ( j = 0; j < inConnectByType[tag].length; j++ )
    {
      connId = inConnectByType[tag][j]; 
      connData = inConnects["conn_" + connId];
      creatorId = connData.creatorId;
      tag = connData.tag;
      sourceId = connData.source;
      targetId = connData.target;

      actorData = inConnectActors["actor_" + sourceId]
      connList.push(actorData);
    }
    if ( connList.length > 0 )
    {
      addTagConnectionSection(table, "in_", tag, connList);
    }

    // now the outbound
    table = document.getElementById("outconnect");
    connList = new Array();
    var j;
    for ( j = 0; j < outConnectByType[tag].length; j++ )
    {
      connId = outConnectByType[tag][j]; 
      connData = outConnects["conn_" + connId];
      creatorId = connData.creatorId;
      tag = connData.tag;
      sourceId = connData.source;
      targetId = connData.target;

      actorData = outConnectActors["actor_" + targetId]
      connList.push(actorData);
    }
    if ( connList.length > 0 )
    {
      addTagConnectionSection(table, "out_", tag, connList);
    }
  }

  collapse();
}


function handleInTargetActorInfo()
{
  if (xmlHttp.readyState==4)
  {
    xmlDoc = xmlHttp.responseXML.documentElement;
    actorName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    actorId = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;

    var actorData = new Object();
    actorData.name = actorName;
    actorData.id = actorId;
    inConnectActors["actor_" + actorData.id] = actorData;

    if ( actorIdList.length > 0 )
    {
      getNextTargetActorInfo(handleInTargetActorInfo);
    }
    else
    {
      populateConnectionInfo();
    }
  }
}


function handleOutTargetActorInfo()
{
  if (xmlHttp.readyState==4)
  {
    xmlDoc = xmlHttp.responseXML.documentElement;
    actorName = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    actorId = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;

    var actorData = new Object();
    actorData.name = actorName;
    actorData.id = actorId;
    outConnectActors["actor_" + actorId] = actorData;
    // actors["actor_" + actorId].name = actorName;

    if ( actorIdList.length > 0 )
    {
      getNextTargetActorInfo(handleOutTargetActorInfo);
    }
    else
    {
      // get the inbound connection info now
      clearInConnects();
      getActorInConnections(currentActorId);
    }
  }
}


function getNextTargetActorInfo(handler)
{
  if (actorIdList.length > 0)
  {
    actorId = actorIdList.pop();
    
    getActorInfo(actorId, handler);
  }
}


function handleActorInConnectionInfo()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example
    xmlDoc = xmlHttp.responseXML.documentElement;
    var connections = xmlDoc.getElementsByTagName("connection");
    var i;
    for ( i = 0; i < connections.length; i++ )
    {
      var connData = new Object();
      connData.id = connections[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
      connData.creatorId = connections[i].getElementsByTagName("creator-id")[0].childNodes[0].nodeValue;
      connData.tag = connections[i].getElementsByTagName("tag")[0].childNodes[0].nodeValue;
      connData.source = connections[i].getElementsByTagName("source")[0].childNodes[0].nodeValue;
      connData.target = connections[i].getElementsByTagName("target")[0].childNodes[0].nodeValue;

      inConnects["conn_" + connData.id] = connData;

      addConnectType(connData.tag);
      inConnectByType[connData.tag].push(connData.id);

      // query source info
      actorIdList.push(connData.source);
    }

    // get outbound connect info for each element in the list
    getNextConnectionInfo(handleActorInConnectionInfo, handleInTargetActorInfo);
  }
}


function handleActorOutConnectionInfo()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example
    xmlDoc = xmlHttp.responseXML.documentElement;
    var connections = xmlDoc.getElementsByTagName("connection");
    var i;
    for ( i = 0; i < connections.length; i++ )
    {
      var connData = new Object();
      connData.id = connections[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
      connData.creatorId = connections[i].getElementsByTagName("creator-id")[0].childNodes[0].nodeValue;
      connData.tag = connections[i].getElementsByTagName("tag")[0].childNodes[0].nodeValue;
      connData.source = connections[i].getElementsByTagName("source")[0].childNodes[0].nodeValue;
      connData.target = connections[i].getElementsByTagName("target")[0].childNodes[0].nodeValue;

      outConnects["conn_" + connData.id] = connData;

      addConnectType(connData.tag);
      outConnectByType[connData.tag].push(connData.id);

      // query target info
      actorIdList.push(connData.target);
    }

    // get outbound connect info for each element in the list
    getNextConnectionInfo(handleActorOutConnectionInfo, handleOutTargetActorInfo);
  }
}

function getNextConnectionInfo(connHandler, actorHandler)
{
  if (connIdList.length > 0)
  {
    connId = connIdList.pop();
    
    xmlHttp = getXMLHTTPObject();
    xmlHttp.onreadystatechange=connHandler;
    url = "foo.py";
    url = url + "?q=" + connId;
    url = "data/connections/" + connId + ".xml";  // for testing
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }
  else
  {
    if ( actorIdList.length > 0 )
    {
      getNextTargetActorInfo(actorHandler);
    }
    else
    {
    }
  }
}


function handleActorOutConnections()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example
    xmlDoc = xmlHttp.responseXML.documentElement;
    var connections = xmlDoc.getElementsByTagName("connection");
    while ( connIdList.length > 0 )
    {
      connIdList.pop();
    }
    var i;
    for ( i = 0; i < connections.length; i++ )
    {
      connId = connections[i].childNodes[0].nodeValue;
      connIdList.push(connId)
    }

    // get outbound connect info for each element in the list
    // TODO: this would really get everything at once, not one at a time
    while (actorIdList.length > 0)
    {
      actorIdList.pop();
    }
    clearOutConnects();
    if ( connIdList.length > 0 )
    {
      getNextConnectionInfo(handleActorOutConnectionInfo, handleOutTargetActorInfo)
    }
    else
    {
      getActorInConnections(currentActorId);
    }
  }
}

function getActorOutConnections(id)
{
  xmlHttp = getXMLHTTPObject();
  xmlHttp.onreadystatechange=handleActorOutConnections;
  url = "foo.py";
  url = url + "?q=" + id;
  url = "data/connections/" + id + "_out.xml";  // for testing
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}


function handleActorInConnections()
{
  if (xmlHttp.readyState==4)
  {
    // Get the data from the server's response
    // example
    xmlDoc = xmlHttp.responseXML.documentElement;
    var connections = xmlDoc.getElementsByTagName("connection");
    var i;
    while ( connIdList.length > 0 )
    {
      connIdList.pop();
    }
    for ( i = 0; i < connections.length; i++ )
    {
      connId = connections[i].childNodes[0].nodeValue;
      connIdList.push(connId)
    }

    // get inbound connect info for each element in the list
    // TODO: this would really get everything at once, not one at a time
    while (actorIdList.length > 0)
    {
      actorIdList.pop();
    }
    clearInConnects();
    if ( connIdList.length > 0 )
    {
      getNextConnectionInfo(handleActorInConnectionInfo, handleInTargetActorInfo)
    }
    else
    {
      populateConnectionInfo();
    }
  }
}

function getActorInConnections(id)
{
  xmlHttp = getXMLHTTPObject();
  xmlHttp.onreadystatechange=handleActorInConnections;
  url = "foo.py";
  url = url + "?q=" + id;
  url = "data/connections/" + id + "_in.xml";  // for testing
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}


