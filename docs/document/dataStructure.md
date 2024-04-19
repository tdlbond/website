---
outline: deep
---

# 数据结构

## 链表

### 单链表

```js
/**
 * @param {number} val
 * @description 链表节点
 */
function Node(val) {
  this.val = val
  this.next = null
}

/**
 * @description 链表
 */
function MyLinkedList () {
  this.head = null
  this.length = 0
}

/**
 * @param {number} index
 * @return {number}
 * @description 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 
 */
MyLinkedList.prototype.get = function (index) {
  if (/^([1-9][0-9]*|0)$/.test(index) && this.length && index < this.length) {
    let i = 0
    let cur = this.head
    while (i < index) {
      cur = cur.next
      i++
    }
    return cur.val
  } else {
    return -1
  }
}

/**
 * @param {number} val
 * @return {void}
 * @description 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点
 */
MyLinkedList.prototype.addAtHead = function (val) {
  if (val != undefined) {
    const node = new Node(val)
    if (this.length) {
      node.next = this.head
    }
    this.head = node
    this.length++
  }
}

/**
 * @param {number} val
 * @return {void}
 * @description 将一个值为 val 的节点追加到链表中作为链表的最后一个元素
 */
MyLinkedList.prototype.addAtTail = function (val) {
  if (val === undefined) {
    return -1
  }
  if (this.length) {
    const node = new Node(val)
    let i = 0
    let cur = this.head
    while (i < this.length - 1) {
      cur = cur.next
      i++
    }
    cur.next = node
    this.length++
  } else {
    this.addAtHead(val)
  }
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 * @description 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (/^([1-9][0-9]*|0)$/.test(index) && val != undefined) {
    if (this.length) {
      if (index < this.length) {
        if (index == 0) {
          this.addAtHead(val)
        } else {
          const node = new Node(val)
          let i = 0
          let cur = this.head
          while (i < index - 1) {
            cur = cur.next
            i++
          }
          node.next = cur.next
          cur.next = node
          this.length++
        }
      } else if (index == this.length) {
        this.addAtTail(val)
      }
    } else {
      if (index == 0) {
        this.addAtHead(val)
      }
    }
  }
}

/**
 * @param {number} index
 * @return {void}
 * @description 如果下标有效，则删除链表中下标为 index 的节点
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (/^([1-9][0-9]*|0)$/.test(index) && this.length && index < this.length) {
    if (this.length == 1) {
      this.head = null
    } else {
      if (index == 0) {
        this.head = this.head.next
      } else {
        let i = 0
        let cur = this.head
        while (i < index - 1) {
          cur = cur.next
          i++
        }
        if (index == this.length - 1) {
          cur.next = null
        } else {
          cur.next = cur.next.next
        }
      }
    }
    this.length--
  }
}
```

### 环形链表

在单链表的基础上令尾节点的指针指向链表中其它的节点。

![环形链表](/images/6.png)

```js {8}
// 判断一个单链表是否是环形链表
function hasCycle(head) {
  while (head) {
    if (head.tag) {
      return true
    }
    // 注意tag的赋值顺序
    head.tag = true
    head = head.next
  }
  return false
}
```

### 相交链表

两个非环形的单链表在某个节点相交。

![相交链表](/images/7.png)

```js
// 判断两个单链表是否存在相交节点
function hasIntersect(headA, headB) {
  if (headA == null || headB == null) {
    return false
  }
  let curA = headA
  let curB = headB
  while (curA != curB) {
    curA = curA == null ? headB : curA.next
    curB = curB == null ? headA : curB.next
  }
  return !!curA
}
```

### 链表中的双指针



<script>
function Node(val) {
    this.val = val;
    this.next = null
}

var MyLinkedList = function() {
    this.head = null;
    this.length = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if (/^([1-9][0-9]*|0)$/.test(index) && this.length) {
        let i = 0;
        let cur = this.head;
        while (i <= this.length - 1) {
            if (i == index) {
                return cur.next.val;
            }
            cur = cur.next;
            i++;
        }
    } else {
        return -1
    }
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    if (val === undefined) {
        return -1;
    }
    const node = new Node(val);
    if (this.length) {
        node.next = this.head;
    }
    this.head = node;
    this.length++;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    if (val === undefined) {
        return -1;
    }
    if (this.length) {
        const node = new Node(val);
        let i = 0;
        let cur = this.head;
        while (i <= this.length - 1) {
            if (i == this.length - 1) {
                cur.next = node;
                this.length++;
                break;
            }
            cur = cur.next;
            i++;
        }
    } else {
        this.addAtHead(val);
    }
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (/^([1-9][0-9]*|0)$/.test(index) && val != undefined && this.length) {
        if (index < this.length - 1) {
            const node = new Node(val);
            let i = 0;
            let cur = this.head;
            while (i <= index) {
              debugger
                if (i == index) {
                    node.next = cur.next;
                    cur.next = node;
                    this.length++;
                    break;
                }
                cur = cur.next;
                i++;
            }
        } else if (index == this.length - 1) {
            this.addAtTail(val)
        } else {
            return -1;
        }
    } else {
        return -1;
    }
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (/^([1-9][0-9]*|0)$/.test(index) && this.length && index <= this.length - 1) {
        let i = 0;
        let cur = this.head;
        while (i <= index) {
            if (i == index) {
                cur.next = null;
                this.length--;
                break;
            }
            cur = cur.next;
            i++;
        }
    } else {
        return -1;
    }
};
</script>