import React, {useRef, useState} from 'react';
import {StyleSheet, Text, ScrollView,View} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import HTMLView from 'react-native-htmlview';
import { VirtualizedListCellContextProvider } from 'react-native/Libraries/Lists/VirtualizedListContext';

const EditorScreen = () => {
  const strikethrough = require('./src/assets/images/camera.png'); //icon for strikethrough
  const video = require('./src/assets/images/camera.png'); //icon for Addvideo
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState('');

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
    );
  }

  return (
    <>
    <View style={{height:'100%',width:"100%",backgroundColor:'lightblue'}}>

      <Text style={styles.text}>Rich Text Box</Text>
      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={'Start Writing Here'}
        onChange={text => setArticle(text)}
        editorInitializedCallback={editorInitializedCallback}
        onHeightChange={handleHeightChange}
      />
      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={'black'}
        selectedIconTint={'pink'}
        disabledIconTint={'black'}
        onPressAddImage={onPressAddImage}
        iconSize={25}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.undo,
          actions.redo,
          actions.checkboxList,
        ]}
        // map icons for self made actions
        iconMap={{
          [actions.heading1]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
          )
        }}
        // insertVideo={insertVideo}
      />
      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={'black'}
        selectedIconTint={'pink'}
        disabledIconTint={'black'}
        onPressAddImage={onPressAddImage}
        iconSize={25}
        actions={[
          actions.insertImage,
          actions.removeFormat,
          actions.insertBulletsList,
          actions.insertOrderedList,
          'text',
          'backgroundColor',
          'html'
        ]}
        iconMap={{
          text: require('./src/assets/images/text.png'),
          backgroundColor: require('./src/assets/images/backgroundColor.png'),
          ['html']: ({tintColor}) => (
            <Text style={[styles.html, {color: tintColor}]}>Html</Text>
          )
        }}
        text={() => {
          RichText.current?.setForeColor('red');
        }}
        backgroundColor={() => {
          RichText.current?.setHiliteColor('yellow');
        }}
        html={() => {
          RichText.current?.setContentHTML(`
        <textarea id="w3review" name="w3review" style="height: 50%;width: 100%;">
            hello
          </textarea><div style="flex-direction: column;justify-self: center;width: auto;background-color: lightblue;margin-top: 10;">
              <div>
                <button type="button">B</button>
                <button type="button">U</button>
                <button type="button">I</button>
              </div>
            </div>
            
            `);
        }}
      />
      {/* <Text style={styles.text}>Result</Text>
      <HTMLView value={article} stylesheet={styles} /> */}
      </View>
    </>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#FFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  rich: {
    minHeight: 300,
    height: '70%',
  },
  richBar: {
    height: 50,
    backgroundColor: '#FFF',
    width: '95%',
    justifyContent:'center',
    alignSelf:"center",
    marginTop:10,
    borderWidth:1,
    borderColor:'black'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign:'center',
    marginVertical: 20,
    color:'#2d333a'
  },
  tib: {
    textAlign: 'center',
    color: '#2d333a',
    fontSize: 25,
  },
  html: {
    textAlign: 'center',
    color: '#2d333a',
    fontSize: 15,
  },
});
