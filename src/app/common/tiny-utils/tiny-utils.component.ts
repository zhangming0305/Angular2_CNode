import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-utils',
  templateUrl: './tiny-utils.component.html',
  styleUrls: ['./tiny-utils.component.css']
})
export class TinyUtilsComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() name: string;
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'table'],
      skin_url: '../../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent({'format': 'text'});
          this.onEditorContentChange.emit(content);
        });
      }
    });
    tinymce.activeEditor.setContent(`@${this.name}`);
  }


  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

