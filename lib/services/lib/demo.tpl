<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title><%= fontfileName %></title>
<style type="text/css">
html,body,ul,li,h3,p{padding:0;margin:0;}
ul,li{list-style:none;}
.main{width:985px;margin:20px auto 0;}
.glyfList{margin-bottom:30px;overflow:hidden;}
.glyf {
    width: 10%;
    float: left;
}
.glyf > div {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    text-align: center;
}
.glyf h3 {
    text-align: center;
    padding: 3px;
    font-size: 14px;
    background-color: #eee;
    border-bottom: 1px solid #fff;
}
.icon{font-size:40px;}

/* css */
<%= cssStyle %>
/* css */
</style>
</head>
<body>

<div class="main">
	<h1><%= fontfileName %></h1>
	<h2>预览 Preview</h2>
	<ul class="glyfList" id="glyfList">
	<% for (let i = 0; i < charmap.length; i++) { %>
	<li class="glyf" data-id="<%=i%>">
    <div>
      <h3><%=charmap[i].cssCode%></h3>
      <div class="icon icon-<%=i%>"></div>
    </div>
	</li>
  <% } %>
	</ul>
<h2>CSS</h2>
<pre class="code css" contenteditable="true"><%= cssStyle %></pre>
</div>
</body>
</html>
