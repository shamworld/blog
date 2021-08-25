# JS数据类型
ECMAScript中有5种简单的数据类型(也称为基本数据类型):Undefined,Null,Boolean,Number和String。还有一种复杂得数据类型----Object,Object本质上时由一组无序得键值对组成得。ECMAScript 不支持任何创建自定义类型得机制，而所有值最终都将时上述6种数据类型之一。咋一看，好像只有6种数据类型不足以表示所有数据；但是，由于ECMAScript数据类型具有动态性，因此的确没有在定义其他数据类型得必要了。

## typeof操作符
鉴于ECMAScript是松散类型得，因此需要有一种手段来检测给定变量的数据类型----typeof就是负责提供这方面信息的操作符。对一个值使用typeof操作符可能返回下列某个字符串:
- "undefined"----如果这个值未定义；
- "boolean"----如果这个值是布尔值；
- "string"----如果这个值是字符串；
- "number"----如果这个值是数值；
- "object"----如果这个值是对象或null；
- "function"----如果这个值是函数；

这几个例子说明，typeof操作符的操作数可以是变量，也可以是数值字面量。注意，typeof是一个操作符而不是函数，因此例子中的圆括号尽管可以使用，但不是必须的。

有时候，typeof操作符会返回一些令人迷惑但技术上确实正确的值。比如，调用typeof null会返回"object"，因为特殊值null被认为是一个空的对象引用。Safari5及之前版本，Chrome7及之前版本在对正则表达式调用typeof操作符时会返回"function"，而其他浏览器在这种情况下会返回"object"。

## Undefined类型
Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined，例如:
```js
var message;
alert(message==undefined);//true;
```
这个例子隐式初始化变量message，因为未经初始化的值默认就会取得undefined值。

不过，包含undefined值的变量与尚未定义的变量还是不一样。看看下面这个例子:
```js
var message;//这个变量声明之后默认取得了undefined值
//下面这个变量并没有声明
//var age
alert(message);//"undefined"
alert(age);    //产生错误
```
运行以上代码，第一个警告弹框会显示变量message值，即"undefined"。而第二个警告框----由于传递给alert()函数的是一个尚未声明的变量age----则会导致一个错误。对于未声明过的变量，只能执行一项操作，即使用typeof操作符检测其数据类型(对于未经声明的变量调用delete不会导致初五，但这个样做没什么实际意义，而且在严格模式下确实会导致错误)。

>对于未初始化的变量执行typeof操作符会返回undefined值，而对于未声明的变量执行typeof操作符同样也会返回undefined值。
```js
var message;//这个变量声明之后默认取得了undefined值
//下面这个变量并没有声明
//var age
alert(typeof message);//undefined
alert(typeof age);//undefined
```

## Null类型
Null类型是第二个只有一个值的数据类型，这个特殊的值是null。从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null值时会返回"object"的原因，如下面的例子所示:
```js
var car = null;
alert(typeof car);//object
```
>如果定义的变量准备在将来用于保存对象，那么最好的将该变量初始化为null而不是其他值。这样一来，只要直接检测null值就可以知道相应的变量是否已经保存了一个对象的引用，如下面的例子所示:
```js
if(car !=null) {
    //对car对象执行某些操作
}
```
实际上，undefined值是派生自null值的
```js
alert(null==undefined);//true
```

主要意在保存对象的变量还没有真正保存对象，就应该明确的让该变量保存null值，这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。

## Boolean类型
该类型只有两个字面值:true和false，这两个值与数字值不是一回事，因此true不一定等于1，而false也不一定等于0。看下面的一个例子:
```js
var found = true;
var lost = false;
```
>需要注意的是，Boolean类型的字面值true和false是区分大小写的。也就是说True和False(以及其他混合大小写形式)都不是Boolean值，只是标识符。

要将一个值转换为其对应的Boolean值，可以调用转型函数Boolean()，如下例所示:
```js
var message = "Hello world!";
var messageAsBoolean = Boolean(message);
```
>注意，只有+0,-0,NaN,false,'',null,undefined值在转换为布尔值时为false,除此之外的值在转换为布尔值的时候全部为true。

## Number类型
>Number类型使用IEEE754格式来表示整数和浮点数值(浮点数值在某些语言中也被称为双精度值)。

最基本的数值字面量格式是十进制整数，除了以十进制表示外，整数还可以通过八进制或十六进制的字面值来表示。其中，八进制字面值的第一位必须是0，然后八进制数字序列(0~7)。如果字面值中的数值超出了范围，那么前导0将被忽略，后面的数值将被当做十进制数值解析。请看下面的例子:
```js
var octalNum1 = 070;//八进制的56
var octalNum2 = 079;//无效的八进制数值----解析未79
var octalNum3 = 08;//无效的八进制数值----解析为8
```

>八进制字面量在严格模式下是无效的，会导致支持的JavaScript引擎抛出错误。

### 浮点数值
所谓浮点数值，就是该数值必须包含一个小数点，并且小数点后面必须至少有一位数字。
```js
var floatNum1 = 1.1;
var floatNum2 = 0.1;
var floatNum3 = .1;//有效，但不推荐
```

由于保存浮点数值需要的内存空间是保存整数值的两倍，因此ECMAScript回不失时机的将浮点数值转换为整数值。显然，如果小数点后面没有跟任何数字，那么这个数值就可以作为整数值来保存。同样地，如果浮点数值本身表示地就是一个整数(1.0)，那么该值也会被转换为整数，如下面地例子所示:
```js
var floatNum1 = 1.;//小数点后面没有数字----解析为1
var floatNum2 = 10.0;//整数----解析为10
```

对于哪些极大或极小地数值，可以用e表示法(即科学计数法)表示地浮点数值表示。用e表示法表示地数值等于e前面地数值乘以10地指数次幂。

``` var floatNum = 3.125e7;等于31250000 ```

### 数值范围
由于内存地限制，ECMAScript并不能保存事件上所有地数值。ECMAScript能够表示地最小数值保存在Number.MIN_VALUE中----在大多数浏览器中，这个值是5e-324;能够表示地最大数值保存在Number.MAX_VALUE中----在大多数浏览器中，这个值是1.7976931348623157e+308。

如果某次计算的结果得到了一个超出JavaScript数值范围的值，那么这个数值将被自动转换成特殊地Infinity值。具体来说，如果这个数值是负数，则回被转换成-Infinity(负无穷)，如果这个数值是正数，则会被转换成Infinity(正无穷)。

### NaN
NaN，即非数值是一个特殊的数值，这个数值用于表示一个本来要返回数值地操作数未返回数值地情况(这样就不会抛出错误了)。

NaN本身有两个非同寻常地特点。
- 任何涉及NaN地操作(例如NaN/10)都会返回NaN
- NaN与任何值都不会相等，包括NaN本身。

例如，下面地代码回返回false:``` alert(NaN == NaN) //false ```

isNaN()函数接受一个参数，该参数可以是任何类型，而函数会帮我们确定这个参数是否"不是数值"。isNaN()在接收到一个值之后，会尝试将这个值转换为数值。某些不是数值地值会直接转为为数值。而任何不能被转换为数值地都会导致这个函数返回true。
```js
alert(isNaN(NaN));//true
alert(isNaN(10));//false(10是一个数值)
alert(isNaN("10"));//false(可以被转换成数值10)
alert(isNaN("blue"));//true(不能转换成数值)
alert(isNaN(true));//false(可以被转换为数值1)
```

### 数值转换
有三个函数可以把非数值转换为数值:
- Number()
- parseInt()
- parseFloat()

**Number()** 函数地转换规则如下:
- 如果是Boolean值，true和false将分别被转换为1和0
- 如果是数字值，只是简单地传入和返回
- 如果是null值，返回0
- 如果是undefined，返回NaN
- 如果是对象，则调用对象地valueOf()方法，然后依照前面地规则转换返回地值。如果转换的结果是NaN，则调用对象地toString()方法，然后再次依照前面地规则转换返回地字符串值
>如果是字符串，遵循下列规则:
- 如果字符串中只包含数字(包含前面带正号或负号地情况)，则将其转换为十进制数值，即"1"会变成1，"123"会变成123，而"011"会变成11(注意:前导的零被忽略了)；
- 如果字符串中包含有效地浮点格式，如"1.1"，则将其转换为对应地浮点数值(同样，也会忽略前导零)；
- 如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小地十进制整数值；
- 如果字符串是空的(不包含任何字符)，则将其转换为0；
- 如果字符串中包含除上述格式之外地字符，则将其转换为NaN；

```js
var num1 = Number("Hello world!");//NaN
var num2 = Number("");            //0
var num3 = Number("000011");      //11
var num4 = Number(true);          //1
```

**parseInt()** 函数在转换字符时，更多地是看其是否符合地数值模式。它会忽略字符串前面地空格，直到找到第一个非空格字符。
- 如果第一个字符不是数字字符或符号，parseInt()就会返回NaN；
- 如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有后续字符或遇到一个非数字字符；
- 如果字符串中地第一个字符是数字字符，parseInt()也能够识别出各种整数格式；
- 如果字符串以"0"开头且后跟数字字符，则会将其当作一个八进制数来解析；

```js
var num1 = parseInt("1234blue");  //1234
var num1 = parseInt("");          //NaN
var num1 = parseInt("0xA");       //10(十六进制数)
var num1 = parseInt("22.5");      //22
var num1 = parseInt("070");       //56(八进制)
var num1 = parseInt("70");        //70(十进制数)
var num1 = parseInt("0xf");       //15(十六进制数)
```

在使用parseInt()解析像八进制字面量地字符串时，ECMAScript3和5存在分歧。

```js
//ECMAScript3认为是56(八进制),ECMScript5认为是70(十进制)
var num = parseInt("070");
```

为了消除在使用parseInt()函数时可能导致地上述困惑，可以为这个函数提供第二个参数:转换时使用地基数。

``` var num = parseInt("0xAF",16);//175 ```

**parseFloat()** 也是从第一个字符开始解析每个字符串，而且也是一直解析导字符串末尾，或者解析到遇见一个无效得浮点数字字符为止。

也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面得字符串将被忽略。另外parseFloat()的第二个区别在于它始终都会忽略前导得零。

>parseFloat()只解析十进制值，因此它没有用第二个参数指定基数得用法。

注意:如果字符串包含得是一个可解析为整数的数(没有小数点，或者小数点后都是零)，parseFloat()会返回整数。

```js
var num1 = parseFloat('1234blue');      //1234(整数)
var num1 = parseFloat('0xA');           //0
var num1 = parseFloat('22.5');          //22.5
var num1 = parseFloat('22.5.4');        //22.5
var num1 = parseFloat('09883.4');       //9883.5
var num1 = parseFloat('3.235e7');      //32350000
```

### String
String类型用于表示由零或多个16位Unicode字符组成得字符序列，即字符串。字符串可以由双引号(")或单引号(')表示，因此下面两种字符串得写法都是有效的:
```js
var firstName = "Nicholas";
var lastName = 'Zakas';
```

>以双引号开头的字符串也必须以双引号结果，而以单引号开头的字符串必须以单引号结尾。

#### 字符字面量
String数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符。

|字面量 | 含义 |
|---- | --- |
| \n | 换行 |
| \t | 制表 |
| \b | 空格 |
| \r | 回车 |
| \f | 进纸 |
| \\ | 斜杠 |
| \' | 单引号(')，在用单引号表示的字符串中使用。例如:'He said, \'hey.\' ' |
| \" | 双引号(")，在用双引号表示的字符串中使用。例如:"He said, \"hey,\" " |
| \xnn | 以十六进制代码nn表示的一个字符(其中n为0~F)。例如,\x41表示"A" |
| \unnnn | 以十六进制代码nnnn表示一个Unicode字符(其中n为0~F)。例如，\u03a3表示希腊字符Σ |

任何字符串的长度都可以通过访问其`length`属性取得,例如:
```js
var a = "Roy";
alert(a.length);//输出3
```

#### 字符串的特点
ECMAScript中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后在用另外一个包含新值的字符串填充该变量，例如:
```js
var a = "Roy";
a = a + "Body";
```

#### 转换为字符串
要把一个值转换为一个字符串有两种方式:
- toString()

- 转型函数String()

>数值，布尔值，对象和字符串值都有toString()方法。但null和undefined值没有这个方法。

多数情况下，调用toString()方法不必传递参数。但是，在调用数值的toString()方法时，可以传递一个参数:输出数值的基数。默认情况下，toString()方法以十进制格式返回数值的字符串表示。
```js
var num = 10;
alert(num.toString());   //"10"
alert(num.toString(2));  //"1010"
alert(num.toString(8));  //"12"
alert(num.toString(10)); //"10"
alert(num.toString(16)); //"a"
```

在不知道要转换的值是不是null或undefined的情况下，还可以使用转型函数String()，这个函数能够将任何类型的值转换为字符串。String()函数遵循下列转换规则:
- 如果值有toString()方法，则调用该方法(没有参数)并返回相应的结果

- 如果值是null，则返回"null"

- 如果值是undefined，则返回"undefined"

```js
var value1 = 10;
var value2 = true;
var value3 = null;
var value4;

alert(String(value1));    //10
alert(String(value2));    //"true"
alert(String(value3));    //""null
alert(String(value4));    //"undefined"
```

### Object类型
对象其实就是一组数据和功能的结合。

在ECAScript中，如果不给构造函数传递参数，则可以省略后面的那一对圆括号。(但不推荐)
```js
var a = new Object;(有效，但是不推荐省略圆括号)
```

Object类型所具有的下列属性和方法。
- constructor:保存着用于创建当前对象和函数。

- hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在。其中，作为参数的属性名(propertyName)必须以字符串形式指定(例如:o.hasOwnProperty("name"))。

- isPrototypeOf(object):用于检查一个对象是否存在于另一个对象的原型链上。

- propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举。与hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定。

- toLocalString():返回对象的字符串表示，该字符串与执行环境的地区对应。

- toString():返回对象的字符串表示。

- valueOf():返回对象的字符串，数值或布尔值表示。通常与toString()方法的返回值相同。

### Symbol
Symbol类型的对象永远不想等，即便创建的时候传入相同的值。因此，可以用解决属性名冲突的问题(适用于多少编码)，作为标记。

```js
Symbol('key') !== Symbol('key'); //true
Symbol('key') === Symbol('key'); //false
```

### BigInt
JavaScript中任意类型精度整数，可以安全存储和操作大整数。即使超出Number能够表示的安全整数范围。

要创建BigInt，只需要在整数的末尾最佳 **n** 即可

```js
var num = 10n;
```

>注意
>
>不能使用Number和BigInt操作数的混合执行算术运算，需要通过显示转换其中的一种类型。










