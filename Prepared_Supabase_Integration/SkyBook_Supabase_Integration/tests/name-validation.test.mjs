import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeName} from '../name-validation.mjs';
for(const name of ['Nguyễn Tiến Phát',"Anne-Marie O'Neil",'D’Arcy','李明','Алексей Иванов'])
 test('Unicode name accepted: '+name,()=>assert.equal(normalizeName(name),name));
test('decomposed Vietnamese name normalizes to NFC',()=>assert.equal(normalizeName('Nguyễn Khoa'),'Nguyễn Khoa'));
for(const name of ['Khoa123','Khoa@','😀 Khoa','---','A','Khoa\nPham'])
 test('invalid name rejected: '+JSON.stringify(name),()=>{
   assert.throws(()=>normalizeName(name));
   if(name.includes('\n')) for(const value of ['\nKhoa','Khoa\n','\tKhoa'])
     assert.throws(()=>normalizeName(value));
 });
test('name length counts Unicode code points',()=>{
 assert.equal([...normalizeName('𐐀𐐁')].length,2);
 assert.throws(()=>normalizeName('A'.repeat(256)));
});
