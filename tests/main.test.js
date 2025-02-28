import { describe, expect, test } from "vitest";
import { add } from "../js/main.js";

// Tests existants
describe('test of the function add()', () => {

    
test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
});

test('returns 1 for string equal 1', () => {
    expect(add('1')).toBe(1);
});

test('returns 3 for string equal 1,2', () => {
    expect(add('1,2')).toBe(3);
});

test('returns 6 for string equal "1\\n2,3"', () => {
    expect(add('1\n2,3')).toBe(6);
});

test('returns 3 for string equal "//;\\n1;2"', () => {
    expect(add('//;\n1;2')).toBe(3);
});

test('throws an error for negative numbers', () => {
    expect(() => add('1,-2,3')).toThrowError('Negatives not allowed. [-2]');
});

test('throws an error for multiple negative numbers', () => {
    expect(() => add('-1,-2,3')).toThrowError('Negatives not allowed. [-1, -2]');
});


test('ignores numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1\n2,1002')).toBe(3);
});

test('supports multi-character delimiters', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
});

test('supports multiple delimiters', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
});

test('supports multiple multi-character delimiters', () => {
    expect(add('//[**][%%]\n1**2%%3')).toBe(6);
});
    })
