function openingDesignInit() {
  this.hooks = ['aceAttribsToClasses', 'aceCreateDomLine'];
  this.aceAttribsToClasses = aceAttribsToClasses;
  this.aceCreateDomLine = aceCreateDomLine;
}

function aceAttribsToClasses(args) {
  if (args.key == 'openingDesignIsImage' && args.value != "")
    return ["openingDesignIsImage"];
  else if (args.key.indexOf('openingDesignImageObject') == 0)
    return [args.key + ":" + args.value];
}



function aceCreateDomLine(args) {
  if (args.cls.indexOf('openingDesignIsImage') >= 0) {
   var clss = [];
   var imageObjects = {};
   $.each(args.cls.split(" "), function (i, cls) {
     if (cls.indexOf("openingDesignImageObject:") == 0) {
       var parts = cls.split(":");
       imageObjects[parts[1]] = parts[2];
     } else {
       clss.push(cls);
     }
   });


   return [{cls: args.cls, extraOpenTags: '<span style="border: 5px solid red">', extraCloseTags: '</span>'}];
  }
}

function openingDesignclicked(event) {
  padeditor.ace.callWithAce(function (ace) {
    rep = ace.ace_getRep();

    ace.ace_replaceRange(rep.selStart, rep.selEnd, "I");
    ace.ace_performSelectionChange([rep.selStart[0],rep.selStart[1]-1], rep.selStart, false);
    ace.ace_performDocumentApplyAttributesToRange(rep.selStart, rep.selEnd,
						  [["openingDesignIsImage", "true"],
						   ["openingDesignImageObject:foo1", "xyzzy"],
						   ["openingDesignImageObject:bar2", "naja"],
						   ]);
  }, "openingDesign", true);
}

/* used on the client side only */
openingDesign = new openingDesignInit();