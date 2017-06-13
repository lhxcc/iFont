@font-face{
	font-family:'<%= fontfileName %>';
	src:url('<%= fontfileName %>.eot');
	src:url('<%= fontfileName %>.eot?#iefix') format('embedded-opentype'),
		url('<%= fontfileName %>.woff') format('woff'),
		url('<%= fontfileName %>.woff2') format('woff2'),
		url('<%= fontfileName %>.ttf') format('truetype'),
		url('<%= fontfileName %>.svg') format('svg');
	font-weight:normal;
	font-style:normal;
}
.icon{
	font-family:'<%= fontfileName %>';
	speak:none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale;
}
<% for (let i = 0; i < charmap.length; i++) { %>
.icon-<%=i%>:before{content:'<%=charmap[i].cssCode%>';}
<% } %>
