var atiIns = 0;

function changeStyleByName(name,attrib,value) {
		var tags = document.getElementsByName(name);
		for(var i=0;i < tags.length;i++)
		{
			eval('tags[i].style.'+attrib+'="'+value+'";');
		} 
}


function getconfig() {

	for (i in G_prefs) {
		if (!getPref(i,G_prefs[i][0])) setPref(i,G_prefs[i][0],G_prefs[i][1]);
		else G_prefs[i][1] = getPref(i,G_prefs[i][0]);
	}

	// Add ATI translations if preferred
	if (cfg['ctrans'] && typeof(atiD) == 'undefined' && atiIns == 0) {
		if (cfg['catioff']) { 
			var nsrc = 'file://' + getHomePath().replace(/\\/g, '/') +'/'+ cfg['catiloc'] + '/html/tech/digital_pali_reader_suttas.js';
		}
		else { var nsrc = 'http://www.accesstoinsight.org/tech/digital_pali_reader_suttas.php'; }
		atiIns = 1;
		var headID = document.getElementsByTagName("head")[0];         
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = nsrc;
		headID.appendChild(newScript);
	}
	

	// update backgrounds
		
	checkbackground();
	checkcpbkg();

	// update fonts, colors

	document.styleSheets[0]['cssRules'][0].style.color = colorcfg['coltext']; 
	document.styleSheets[0]['cssRules'][0].style.fontFamily = colorcfg['colfont']; 
	document.styleSheets[0]['cssRules'][1].style.fontSize = colorcfg['colsize'] + 'px'; 
	
	document.styleSheets[0]['cssRules'][2].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.9) + 'px';  // select, etc.
	document.styleSheets[0]['cssRules'][2].style.backgroundColor = colorcfg['colinput'];  // select, etc.
	
	document.styleSheets[0]['cssRules'][3].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.8) + 'px';  // small
	document.styleSheets[0]['cssRules'][4].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.7) + 'px';  // tiny
	document.styleSheets[0]['cssRules'][5].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*1.25) + 'px';  // large
	document.styleSheets[0]['cssRules'][6].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*1.5) + 'px';  // huge
	
	document.styleSheets[0]['cssRules'][9].style.backgroundColor = colorcfg['colbkcp'];  // buttons
	document.styleSheets[0]['cssRules'][10].style.backgroundImage = '-moz-radial-gradient('+colorcfg['colbutton']+','+colorcfg['colbkcp']+')';  // buttons
	document.styleSheets[0]['cssRules'][11].style.backgroundImage = '-moz-radial-gradient('+colorcfg['colbutton']+','+colorcfg['colbkcp']+')';  // buttons
}

function changecss(myclass,element,value) {
	var CSSRules
	if (document.all) {
		CSSRules = 'rules'
	}
	else if (document.getElementById) {
		CSSRules = 'cssRules'
	}
	for (var i = 0; i < document.styleSheets[0][CSSRules].length; i++) {
		if (document.styleSheets[0][CSSRules][i].selectorText == myclass) {
			document.styleSheets[0][CSSRules][i].style[element] = value
		}
	}	
}

function checkbackground(x) {
	if (x==1) { 
		var colort = document.getElementById('colbk').value; 
		var bkgimg = document.getElementById('bkgimg').checked; 
	}
	else { 
		var colort = colorcfg['colbk']; 
		var bkgimg = cfg['bkgimg']; 
	}
	var bkgurl = (bkgimg == 'checked' || bkgimg == true ? 'url(chrome://digitalpalireader/content/images/background.png)' : '');

	document.styleSheets[0]['cssRules'][7].style.backgroundImage = bkgurl;  // paperback
	document.styleSheets[0]['cssRules'][7].style.backgroundColor = colort;  // paperback

	document.body.style.backgroundColor = colort;



}

function checkcpbkg(x) {
	if (x==1) { 
		var colort = document.getElementById('colbkcp').value 
		document.getElementById('confanf').style.backgroundColor = colort;
		document.getElementById('confcpf').style.backgroundColor = colort;
	}
	else { var colort = colorcfg['colbkcp'] }

	document.styleSheets[0]['cssRules'][8].style.backgroundImage = '-moz-linear-gradient(left,'+colort+',white,'+colort+')';  // chromeback
}

function loadOptions() {

	var winW = window.innerWidth;
	var winH = window.innerHeight;

	document.getElementById('mafa').innerHTML = '';
	var mafaout = '<table style="width:100%">';
		mafaout += '<tr>';
			mafaout += '<td valign="top" align="center"><div align="center"><b>Layout</b><br /><br /></div><form id="sizeform"><table align=center border=1 height="' + (winH/3) + '">';
			mafaout += '<tr>';
				mafaout += '<td id="confcpf" bgcolor="'+colorcfg['colbkcp']+'" align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input onBlur="confmove[2] = checksizes(\'ControlW\',this.value); this.value = confmove[2]; moveframex(2,1);" id="ControlW" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td>';
				mafaout += '<td width="' + ((winW-confmove[2])/3) + '" align=center>(<i>auto</i>)</td>';
			mafaout += '</tr>';
			mafaout += '<tr>';
				mafaout += '<td id="confanf" bgcolor="'+colorcfg['colbkcp']+'" align=center height="1">(<i>auto</i>)</td>';
			mafaout += '</tr>';
			mafaout += '<tr>';
				mafaout += '<td id="confdictf" align=center height="' + (confmove[1]/3) + '">H <input onBlur="confmove[1] = checksizes(\'DictH\',this.value); this.value = confmove[1]; moveframex(2,1);" id="DictH" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
			mafaout += '</tr>';
		mafaout += '</table>';
		mafaout += '<table><tr>';
				mafaout += '<td align="right"><b id="col6" style="background-color:'+colorcfg['colbk']+'; color:'+colorcfg['coltext']+'">Main Background: </b></td>';
				mafaout += '<td><input name="color6" id="colbk" value="'+colorcfg['colbk']+'" type=input size=7 title="Enter desired background color" onkeyup="document.getElementById(\'col6\').style.backgroundColor=this.value; checkbackground(1)"> <input type="checkbox" id="bkgimg" ' + (cfg['bkgimg']=='checked' ? 'checked':'') + ' onclick="checkbackground(1);" '+cfg['bkgimg']+'>Add texture</input>';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b id="col7" style="color:'+colorcfg['coltext']+'; background-color:'+colorcfg['colbkcp']+'">Panel Background: </b></td>';
				mafaout += '<td><input name="color7" id="colbkcp" value="'+colorcfg['colbkcp']+'" type=input size=7 title="Enter desired control panel color" onkeyup="document.getElementById(\'col7\').style.backgroundColor=this.value; checkcpbkg(1)">';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b id="col10" style="color:'+colorcfg['coltext']+'">Input Background: </b></td>';
				mafaout += '<td><input name="color10" id="colinput" value="'+colorcfg['colinput']+'" type=input size=7 title="Enter desired input color" onkeyup="this.style.backgroundColor=this.value">';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><span class="abut obut" id="col11" style="color:'+colorcfg['coltext']+'">Button Background:</span> </td>';
				mafaout += '<td><input name="color11" id="colbutton" value="'+colorcfg['colbutton']+'" type=input size=7 title="Enter desired button color" onkeyup="document.getElementById(\'col11\').style.backgroundColor=this.value">';
			mafaout += '</tr>';
		mafaout += '</table>';
		mafaout += '</p></form></td>';
		mafaout += '<td style="border-left:grey 1px solid" align=center valign="top"><div align=center><b>Text</b><br /><br /></div>';
			mafaout += '<form id="colorform">';
			mafaout += '<table><tr>';
				mafaout += '<td align="right"><font style="color:'+colorcfg['coltext']+'" id="col1">Text: </font></td>';
				mafaout += '<td><input name="color1" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"></td>';
				mafaout += '<td align="right"><b id="col8">Font: </b></td>';
				mafaout += '<td><input name="color8" id="colfont" value="'+colorcfg['colfont']+'" type=input size=7 title="Enter desired font family" onkeyup="document.getElementById(\'col8\').style.fontFamily=this.value">';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b style="color:'+colorcfg['colsel']+'" id="col2">Selected: </b></td>';
				mafaout += '<td><input name="color2" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br>';
				mafaout += '<td align="right"><b id="col9">Size: </b></td>';
				mafaout += '<td><input name="color9" id="colsize" value="'+colorcfg['colsize']+'" type=input size=7 title="Enter desired font size in pixels" onkeyup="document.getElementById(\'col9\').style.fontSize=this.value + \'px\'">px';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b style="color:'+colorcfg['colped']+'" id="col3">PED: </b></td>';
				mafaout += '<td><input name="color3" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;">';
				mafaout += '<td align="right"><b id="col9">Script: </b></td>';
				mafaout += '<td><select class="sel" size="1" name="color10" id="translits" selectedIndex="'+cfg['translits']+'" title="Select desired script" onchange="changeScript(1);"><option selected value=0>Roman</option><option value=1>Thai</option><option value=2>Devanagari</option><option value=3>Myanmar</option><option value=4>Sinhala</option></select>';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b style="color:'+colorcfg['coldppn']+'" id="col4">DPPN: </b></td>';
				mafaout += '<td><input name="color4" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;">';
			mafaout += '</tr><tr>';
				mafaout += '<td align="right"><b style="color:'+colorcfg['colcpd']+'" id="col5">CPD: </b></td>';
				mafaout += '<td><input name="color5" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;">';
			mafaout += '</tr></table>';
		mafaout += '</form></td>';
	mafaout += '</tr><tr>';
		mafaout += '<td colspan=3><hr /><form name="miscform">';
			mafaout += '<p><b>Options:</b></p>';
			mafaout += '<p>Maximum number of alternatives to show in compound analysis:  <input type=input size=3 id="altlimit" value="'+cfg['altlimit']+'">';
			mafaout += '<p>Dictionary search as you type <input type=checkbox id="autodict" '+cfg['autodict']+'>';
			mafaout += '<p>Show: <input type=checkbox id="showPages" '+cfg['showPages']+'> page numbers&nbsp; <input type=checkbox id="showVariants" '+cfg['showVariants']+'> variant readings&nbsp; <input type=checkbox id="showPermalinks" '+cfg['showPermalinks']+'> permalinks (<span class="hovershow pointer">☸</span>)&nbsp; <input type=checkbox id="showNames" '+cfg['showNames']+'> DPPN title links&nbsp; <input type=checkbox id="showPedLinks" '+cfg['showPedLinks']+'> links in PED entries';
			mafaout += '<p>Show translations <input type=checkbox id="ctrans" '+cfg['ctrans']+' onclick="this.checked==true ? document.getElementById(\'catiul\').style.display = \'block\' : document.getElementById(\'catiul\').style.display = \'none\';">';
			mafaout += '<ul id="catiul" '+(cfg['ctrans'] == 'checked' ? '': 'style="display:none"')+' ><li><input type="checkbox" name="catioff" id="catioff" '+cfg['catioff']+'> Use <a href="http://www.accesstoinsight.org/tech/download/bulk/bulk.html" style="color:'+colorcfg['colcpd']+'" target="_blank">offline version</a> of <a href="http://www.accesstoinsight.org/" style="color:'+colorcfg['colcpd']+'" target="_blank">accesstoinsight.org</a> - location: <b>'+getHomePath()+'/</b><input type="text" name="catiloc" id="catiloc" value="'+cfg['catiloc']+'" onkeyup="if(fileExists(this.value,\'start.html\')) { document.getElementById(\'atilocx\').style.color=\'green\'; document.getElementById(\'atilocx\').innerHTML=\'ok\'; } else{document.getElementById(\'atilocx\').style.color=\'red\'; document.getElementById(\'atilocx\').innerHTML=\'x\';}"><b>/start.html <font id="atilocx" size="5" style="color:'+(fileExists(cfg['catiloc'],'start.html') ? colorcfg['coldppn']+'">ok' : colorcfg['colped']+'">x' )+'</font></b></li></ul></p>';
		mafaout += '</form></td>';
	mafaout += '</tr></table>';
	mafaout += '<p align=center>';
		mafaout += '<span class="abut obut" onclick="saveOptions()">Save</span>';
		mafaout += '&nbsp;<span class="abut obut" onclick="moveframex(2); refreshit()">Cancel</span>';
		mafaout += '&nbsp;<span class="abut obut" onclick="eraseOptions(1)">Restore defaults</span><b style="color:'+colorcfg['colsel']+'" id=message> </b>';
	mafaout += '</p>';
	document.getElementById('mafbc').innerHTML = mafaout;
	document.getElementById('translits').selectedIndex = parseInt(cfg['translits']);
	document.getElementById('maf').scrollTop = 0; 
}

function saveOptions() {
	
	if(document.miscform.catioff.checked && !fileExists(document.miscform.catiloc.value,'start.html')) {
		alertFlash('Unrecognized local directory for ATI.  Please disable offline translations before saving preferences.','red'); 
		return; 
	}
	
	var Val;
	var Pref;
	for (i = 0; i < cPrefs.length; i++) {
		Pref = cPrefs[i];
		if (document.getElementById(Pref)) {
			Val = document.getElementById(Pref).value;
			if (Val) {
				setColPref(Pref,Val);
			}
		}
	}
	for (i = 0; i < sPrefs.length; i++) {
		Pref = sPrefs[i];
		if (document.getElementById(Pref)) {
			Val = document.getElementById(Pref).value;
			if (Val) {
				Val = checksizes(Pref,Val);
				setSizePref(Pref,Val);
			}
		}
	}
	for (i = 0; i < mPrefs.length; i++) {
		Pref = mPrefs[i];
		if (document.getElementById(Pref)) {
			if (document.getElementById(Pref).type=='checkbox') {
				Val = document.getElementById(Pref).checked;
				if (Val == true) Val = 'checked';
				if (Val == false) Val = 'unchecked';
			}
			else Val = document.getElementById(Pref).value;
			setMiscPref(Pref,Val);
		}
	}
	alertFlash("Options saved.",'green');
	moveframex(2);
	atiIns = 0; // in case we have to load a new ATI - it will still check for atiD
	getconfig();
}

function checksizes(pref,size) {

	var winW = window.innerWidth;
	var winH = window.innerHeight;
	switch (pref) {
		case 'ControlW':
			if (size < 80) { return 80; }
			if (size > (winW - 200)) { return (winW-200); }
			break;
		case 'AnalyzeH':
			if (size < 20) { return 20; }
			if (size > (winH - parseInt(confmove[1])-200)) { return (winH - parseInt(confmove[1]) - 200); }
			break;
		case 'DictH':
			if (size < 40) { return 40; }
			if (size > (winH - parseInt(confmove[0])-200)) { return (winH - parseInt(confmove[0]) - 200); }
			break;
		}
	return parseInt(size);
}

function eraseOptions(which) {
	
	var yes = confirm('Are you sure you want to reset all options?');
	
	if(!yes) return;
	
	for (i = 0; i < cPrefs.length; i++) {
		var Pref = cPrefs[i];
		var Val = cPrefVals[i];
		setColPref(Pref,Val);
	}
	for (i = 0; i < sPrefs.length; i++) {
		var Pref = sPrefs[i];
		var Val = sPrefVals[i];
		setSizePref(Pref,Val);
	}
	for (i = 0; i < mPrefs.length; i++) {
		var Pref = mPrefs[i];
		var Val = mPrefVals[i];
		setMiscPref(Pref,Val);
	}
	getconfig();
	if (which) {
		loadOptions();
		alertFlash("Options reset.",'green');
		moveframex(2);
	}
	else { refreshit(1); }
}

